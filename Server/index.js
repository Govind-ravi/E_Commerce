import express from "express";
import cors from "cors";
import connectDB from "./config/DB.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path"; // Import path module
import { fileURLToPath } from 'url'; // Import to handle __dirname in ES module

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure CLIENT_URL is set in your .env
    credentials: true,
  })
);

// Additional middlewares
app.use(cookieParser());
app.use(express.json());

// API routes
app.use("/api", Router);

// Resolve __dirname since it's not available in ES modules by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the React frontend
app.use(express.static(path.join(__dirname, "..", "E-commerce", "dist")));

connectDB();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "E-commerce", "dist", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
