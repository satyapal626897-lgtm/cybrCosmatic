const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { addProduct, getProducts } = require("../controllers/productController");

router.post("/add", upload.array("images", 10), addProduct);
router.get("/", getProducts);

module.exports = router;