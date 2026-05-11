import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import '../css/Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [f, setF] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const loadScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePay = async (e) => {
        e.preventDefault();
        const res = await loadScript();
        if (!res) return alert("SDK failed to load");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const { data } = await axios.post(`${backendUrl}/api/payment/checkout`, { amount: total });
            
            if (!data.id) {
                console.error("Order creation failed:", data);
                return alert("Backend Order ID missing! Check your Razorpay Keys in .env");
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
                amount: data.amount,
                order_id: data.id,
                name: 'Satya Beauty',
                description: 'Order Payment',
                handler: async (response) => {
                    await axios.post(`${backendUrl}/api/payment/verify`, {
                        ...f, products: cart, amount: total, 
                        paymentId: response.razorpay_payment_id, 
                        orderId: response.razorpay_order_id
                    });
                    alert("Order Placed! Thank you for choosing us! ✨");
                    clearCart();
                    navigate('/');
                },
                theme: { color: '#ff416c' }
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (err) => {
                alert("Payment Failed: " + err.error.description);
            });
            rzp.open();
        } catch (err) { 
            console.error(err);
            alert("Payment Error: " + (err.response?.data?.message || "Server unreachable")); 
        }
    };

    if (cart.length === 0) return <div className="checkout-page" style={{display:'flex', alignItems:'center', justifyContent:'center'}}><div className="checkout-card" style={{textAlign:'center'}}><h2>Your Cart is Empty</h2><p>Looks like you haven't added anything yet.</p><button onClick={()=>navigate('/')} className="pay-btn-premium" style={{width:'auto', padding:'15px 40px'}}>Go Shopping</button></div></div>;

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {/* Left Side: Shipping Form */}
                <div className="checkout-card">
                    <div className="section-header">
                        <h2>Checkout Details</h2>
                        <p>Complete your shipping and contact information</p>
                    </div>
                    <form onSubmit={handlePay}>
                        <div className="input-group">
                            <input onChange={e=>setF({...f, name: e.target.value})} required placeholder="Full Name" />
                        </div>
                        <div className="form-row">
                            <div className="input-group"><input type="email" onChange={e=>setF({...f, email: e.target.value})} required placeholder="Email Address" /></div>
                            <div className="input-group"><input type="tel" onChange={e=>setF({...f, phone: e.target.value})} required placeholder="Phone Number" /></div>
                        </div>
                        <div className="input-group">
                            <input onChange={e=>setF({...f, address: e.target.value})} required placeholder="Shipping Address (House No, Street, Area)" />
                        </div>
                        <div className="form-row">
                            <div className="input-group"><input onChange={e=>setF({...f, city: e.target.value})} required placeholder="City" /></div>
                            <div className="input-group"><input onChange={e=>setF({...f, state: e.target.value})} required placeholder="State" /></div>
                        </div>
                        <div className="input-group">
                            <input onChange={e=>setF({...f, pincode: e.target.value})} required placeholder="Pincode" />
                        </div>
                        <button type="submit" className="pay-btn-premium">Secure Payment: ₹{total}</button>
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="checkout-card" style={{padding: '30px'}}>
                    <div className="section-header" style={{marginBottom:'25px'}}>
                        <h2 style={{fontSize:'24px'}}>Order Summary</h2>
                        <p>{cart.length} item(s) in your cart</p>
                    </div>
                    
                    <div className="order-items">
                        {cart.map((item, i) => (
                            <div key={item._id} className="item-row">
                                <div className="item-img-wrapper">
                                    <img 
                                        src={item.images && item.images[0] ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url) : `https://images.unsplash.com/photo-1596462502278-27bf870011f4?w=200&h=200&fit=crop&q=80&sig=${i}`} 
                                        alt={item.name} className="item-img" 
                                    />
                                    <span className="item-qty-badge">{item.quantity}</span>
                                </div>
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price}</p>
                                </div>
                                <div style={{marginLeft:'auto', fontWeight:'600'}}>₹{item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-details">
                        <div className="summary-line"><span>Subtotal</span><span>₹{total}</span></div>
                        <div className="summary-line"><span>Shipping</span><span style={{color:'#ff416c', fontWeight:'600'}}>FREE</span></div>
                        <div className="summary-line total-line"><span>Total Amount</span><span>₹{total}</span></div>
                    </div>
                    
                    <p style={{fontSize:'12px', color: '#888', textAlign:'center', marginTop:'20px'}}>
                        🔒 SSL Encrypted & Secure Checkout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;