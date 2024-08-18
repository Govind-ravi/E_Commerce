import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  collectionName: {
    type: String
  },
  collectionProductId: [{
    id: { type: String }, default: []
  }],  
},
  {
    timestamps: true,
  });
const adminModel = mongoose.model("collection", collectionSchema);

export default adminModel;
