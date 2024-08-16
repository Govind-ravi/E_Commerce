import adminModel from "../models/adminModel.js";
import productModel from "../models/productModel.js";

export const uploadProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body.productData);
    console.log(newProduct);
    
    await newProduct.save();
    console.log(newProduct);
    res
      .status(201)
      .json({ message: "Product uploaded successfully", newProduct });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const uploadCollection = async (req, res) => {
  try {
    const { collectionName, collectionProducts } = req.body;
    const newCollections = new adminModel(collectionName, collectionProducts);
    await newCollections.save();

    res
      .status(201)
      .json({ message: "Collections saved successfully", newCollections });
  } catch (error) {
    res.status(500).json({ message: "Error saving collections", error });
  }
};

export const allCollections = async (req, res) => {
  try {
    const collections = await adminModel.find();
    res
      .status(200)
      .json({
        collections,
        message: "all collection fetch successfully",
        error: false,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error });
  }
};