import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart(); 

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (orderDetails) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK load nahi hua. Internet check karo!');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', 
      amount: totalPrice * 100,    
      currency: 'INR',
      name: 'Your Shop Name',     
      description: 'Order Payment',
      handler: function (response) {
        
        alert(`Payment Successful! \nPayment ID: ${response.razorpay_payment_id}`);
        clearCart();        
        navigate('/');      
      },
      prefill: {
        name: orderDetails.name,
        email: '',          
        contact: '',        
      },
      notes: {
        address: orderDetails.address,
        city: orderDetails.city,
        state: orderDetails.state,
        pinCode: orderDetails.pinCode,
        country: orderDetails.country,
      },
      theme: {
        color: '#e91e8c', 
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      alert(`Payment Failed! \nReason: ${response.error.description}`);
    });

    rzp.open(); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderDetails = {
      name: formData.get('name'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      pinCode: formData.get('pin'),
      country: formData.get('country'),
    };

    console.log('Order Details:', orderDetails);
    handlePayment(orderDetails); 
  };

  return (
    <>
      <h1>Checkout Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" required /></label>
        <label>Address: <input type="text" name="address" required /></label>
        <label>City: <input type="text" name="city" required /></label>
        <label>State: <input type="text" name="state" required /></label>
        <label>Pin Code: <input type="text" name="pin" required /></label>
        <label>Country: <input type="text" name="country" required /></label>

        <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          Total: ₹{totalPrice}  
        </div>

        <button type="submit">Pay ₹{totalPrice} </button>
      </form>
    </>
  );
};

export default Checkout;