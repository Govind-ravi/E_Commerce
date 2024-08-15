import adminModel from "../models/adminModel.js";
import productModel from "../models/productModel.js";

export const getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const query = req.query.query; // Extracting the query parameter

  try {
    const products = await productModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products); // Responding with the found products
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCollections = async (req, res) => {
  const collectionName = req.params.name;
  try {
    const collection = await adminModel.findOne({ collectionName });
    if (!collection) {
      res.status(404).json({ message: "No such collection", error: true });
    } else {
      res
        .status(200)
        .json({
          collection: collection,
          message: "Collection successfully fetched",
          error: false,
        });
    }
  } catch (error) {
    res.status(404).json({ message: "Internal error", error });
  }
};
