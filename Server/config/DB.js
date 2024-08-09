import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb connection established");
        
    } catch (error) {
        console.error("Failed to connect to MongoDB");
    } 
}

export default connectDB;