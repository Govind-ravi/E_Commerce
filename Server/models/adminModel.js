import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    unique: true
  },
  collectionProductId: [{
    id: { type: String }
  }],  
},
  {
    timestamps: true,
  });
const adminModel = mongoose.model("collection", collectionSchema);

export default adminModel;
