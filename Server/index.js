import express from "express";
import cors from "cors";
import connectDB from "./config/DB.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure CLIENT_URL is set to your frontend URL
    credentials: true,
  })
);

// Additional middlewares
app.use(cookieParser());
app.use(express.json());

// API routes
app.use("/api", Router);

// Serve a basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World! This is the Govind Hub API.");
});

// Connect to the database
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
