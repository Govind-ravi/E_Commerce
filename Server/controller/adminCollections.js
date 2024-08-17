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

export const createCollection = async (collectionName, collectionProductId) => {
  try {
    const collection = await adminModel.findOne({collectionName})
    if (collection) {
      return res.status(400).json({ message: "Collection already exists" });
    }
    const newCollection = new adminModel({
      collectionName,
      collectionProductId: [collectionProductId] // Initialize with one product ID
    });

    await newCollection.save();
    res.status(201).json({ message: "Collection created successfully", newCollection });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addToCollection = async (collectionId, productId) => {
  try {
    // Find the collection by its ID
    const collection = await adminModel.findById(collectionId);

    if (collection) {
      // Check if the product ID is already in the array
      if (!collection.collectionProductId.includes(productId)) {
        // Add the product ID to the array
        collection.collectionProductId.push(productId);
        await collection.save();
        res.status(200).json({message: 'Product added to collection successfully'})
      } else {
        res.status(400).json({ message: 'Product already exists in collection' });
      }
    } else {
      res.status(404).json({ message: 'Collection not found' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
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