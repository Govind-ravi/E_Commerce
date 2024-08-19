import adminModel from "../models/adminModel.js";
import productModel from "../models/productModel.js";

export const uploadProduct = async (req, res) => {
  try {
    const newProduct = new productModel(req.body.productData);
    await newProduct.save();
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

export const createCollection = async (req, res) => {
  const { collectionName } = req.body;
  try {
    const collection = await adminModel.findOne({collectionName})
    if (collection) {      
      return res.status(400).json({ message: "Collection already exists" });
    }
    const newCollection = new adminModel({
      collectionName, collectionProductId: []
    });

    await newCollection.save();

    res.status(201).json({ message: "Collection created successfully", newCollection });
  } catch (err) {
    res.status(404).json({ message: err.message });    
  }
};
export const deleteProductIdfFromCollection = async (req, res) => {
  const { collectionId, productId } = req.body;
  try {
    const collection = await adminModel.findById(collectionId)
    
    if (!collection) {
      return res.status(400).json({ message: "Collection already exists" });
    }
    const updatedCollection = await adminModel.findByIdAndUpdate(collectionId, {
      $pull: { collectionProductId: { id: productId } }
    });
    
    
    await updatedCollection.save();
    console.log('called');
    res.status(201).json({ message: "Product removed successfully", updatedCollection });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addToCollection = async (req, res) => {
  const {collectionId, productId} = req.body
  try {
    const collection = await adminModel.findById(collectionId);

    if (collection) {
      if (!collection.collectionProductId.includes(productId)) {
        collection.collectionProductId.push({id: productId});
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
        data: collections,
        message: "all collection fetch successfully",
        error: false,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error });
  }
};