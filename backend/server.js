import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongodb.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/v1/auth", authRoutes);
app.use("/v1/messages", messageRoutes);
app.use("/v1/users", userRoutes);

app.listen(5000, () => {
  connectMongoDB();
  console.log(`server running on port ${PORT}`);
});
