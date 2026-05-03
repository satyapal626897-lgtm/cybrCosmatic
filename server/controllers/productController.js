const Product = require("../models/productModel");
const cloudinary = require("../cloudinary");

const addProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    
    let imagesData = [];

    // Check if files are uploaded
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Use cloudinary to upload images from buffer
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        imagesData.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    const product = new Product({
      name,
      price,
      category,
      stock,
      images: imagesData,
    });

    await product.save();
    res.json({ message: "Product added successfully", product });

  } catch (err) {
    console.log(err);
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  addProduct,
  getProducts
};