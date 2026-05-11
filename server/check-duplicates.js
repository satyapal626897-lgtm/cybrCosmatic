const mongoose = require("mongoose");
const Product = require("./models/productModel");

mongoose.connect("mongodb://localhost:27017/beauty")
  .then(async () => {
    const products = await Product.find();
    console.log(`Total products: ${products.length}`);
    const names = products.map(p => p.name);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    console.log(`Duplicates found: ${JSON.stringify(duplicates)}`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
