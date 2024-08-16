import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tags: {
      type: [String],
      default: []
    },
    brand: {
      type: String,
    },
    weight: {
        type: Number,
        min: 0,
        default: 0
    },
    dimensions: {
        width: { type: Number, min: 0, default: 0 },
        height: { type: Number, min: 0, default: 0 },
        depth: { type: Number, min: 0, default: 0 }
    },
    warrantyInformation: {
        type: String,
    },
    availabilityStatus:{
        type: String,
        enum: ["In Stock", "Low Stock", "Out of Stock"],
        default: "In Stock"
    },
    reviews: {
        type: [
          {
            rating: { type: Number, min: 0, max: 5 },
            comment: { type: String },
            date: { type: Date, default: Date.now },
            reviewerName: { type: String },
            reviewerEmail: { type: String },
          },
        ],
        default: [],
    },
    returnPolicy: {
        type: String,
        default: "30 days return policy",
    },
    images: {
        type: [String],
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Product", productSchema);

export default productModel;
