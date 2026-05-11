const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    products: Array,
    amount: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
