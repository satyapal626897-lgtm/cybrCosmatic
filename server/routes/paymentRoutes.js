const express = require('express');
const router = express.Router();
const { createOrder, saveOrder } = require('../controllers/paymentController');

router.post('/checkout', createOrder);
router.post('/verify', saveOrder);

module.exports = router;
