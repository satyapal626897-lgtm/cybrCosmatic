const Product = require("../models/productModel");
const cloudinary = require("../cloudinary");

const addProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const trimmedName = name.trim();

    // Check if product with same name already exists (Case-insensitive)
    const existingProduct = await Product.findOne({ 
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") } 
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    
    let imagesData = [];

  
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        
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
      name: trimmedName,
      price,
      category,
      stock,
      images: imagesData,
    });

    await product.save();
    res.json({ message: "Product added successfully", product });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error while adding product" });
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