import mongoose from "mongoose";
import { productSchema } from "./productModel.js";

const collectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    unique: true
  },
  collectionProducts: [productSchema]
});
const adminModel = mongoose.model("collection", collectionSchema);

export default adminModel;
