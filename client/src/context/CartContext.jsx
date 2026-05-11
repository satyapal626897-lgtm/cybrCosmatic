import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      setPopupMsg(`${product.name} is already in your cart!`);
      setShowPopup(true);
      return;
    }
    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    toast.success("Added to cart!");
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item._id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 }; 
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, showPopup, setShowPopup, popupMsg }}>
      {children}
    </CartContext.Provider>
  );
};
