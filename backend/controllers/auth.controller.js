import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      birthday,
    } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password  don't match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email is already exit" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run/document/
    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      username,
      email,
      phone,
      gender,
      birthday,
      password: hashedPassword,
      profileImage: gender === "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      });
    } else {
      res.status(401).json({ error: "UserData is Invalid" });
    }
  } catch (error) {
    console.log("Error is SignIn Controller", error.message);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email is a", email);
    const user = await User.findOne({ email });
    // console.log("user is a", user);
    const isPasswordCorrect = bcrypt.compare(password, user.password || "");
    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid Credential" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error is login Controller", error.message);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error is login Controller", error.message);
    res.status(400).json({ error: "Internal Server Error" });
  }
};
