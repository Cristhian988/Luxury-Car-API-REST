import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import autoRouter from "./routes/autoRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auto", autoRouter);

// Routes
app.get("/", (req, res) => {
  res.send("API Working!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
