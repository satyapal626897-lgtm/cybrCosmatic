
import React, { useState } from "react";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: null
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    setProduct({...product,image: e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("image", product.image);

   const response = await axios.post("http://localhost:5000/api/product/add", formData);

    alert("Product Added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />
      <input type="file" onChange={handleImage} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default Product;