import productModel from '../models/productModel.js';

export const uploadProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = new productModel(productData);
    await newProduct.save();

    res.status(201).json({ message: 'Product uploaded successfully', newProduct });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const query = req.query.query; // Extracting the query parameter

  try {
    const products = await productModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json(products); // Responding with the found products
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};