import express from "express";
import cors from "cors";
import connectDB from "./config/DB.js";
import Router from "./routes/index.js";
import cookieParser from "cookie-parser";
import productModel from "./models/productModel.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", Router);
const port = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World! This is the Govind Hub API.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
