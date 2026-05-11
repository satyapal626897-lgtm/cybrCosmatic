const Razorpay = require('razorpay');
const Order = require('../models/orderModel');

const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const order = await rzp.orders.create({ 
            amount: Math.round(req.body.amount * 100), 
            currency: "INR" 
        });
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.saveOrder = async (req, res) => {
    try {
        await Order.create(req.body);
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
