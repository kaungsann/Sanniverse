import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config();

// const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow cookies and credentials if needed
  })
);

app.use("/v1/auth", authRoutes);
app.use("/v1/messages", messageRoutes);
app.use("/v1/users", userRoutes);

server.listen(5000, () => {
  connectMongoDB();
  console.log(`server running on port ${PORT}`);
});
