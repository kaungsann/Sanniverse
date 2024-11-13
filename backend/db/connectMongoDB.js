import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected mongodb");
  } catch (error) {
    console.log("Error Connecting to Mongodb", error.message);
  }
};

export default connectMongoDB;
