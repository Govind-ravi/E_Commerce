import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: String,
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
      default: "",
    },
    address: {
      type: Array,
      default: [],
    },
    cart: {
      type: [{
        id: { type: String },
        quantity: { type: Number }
      }],
      default: [],
    },
    wishlist: {
      type: [{
        id: { type: String }
      }],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);

export default userModel;
