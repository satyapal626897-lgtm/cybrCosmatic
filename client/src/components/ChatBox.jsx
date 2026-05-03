import React, { useState } from 'react';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! Welcome to Satya Beauty", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

   
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Are you ready to checkout? Click below to complete your payment.", 
        sender: "bot",
        action: "payment"
      }]);
    }, 1000);
  };

  const handlePayment = () => {
    setMessages(prev => [...prev, {
      text: " Payment Successful! Thank you for shopping with Satya Beauty. Your order is confirmed.",
      sender: "bot"
    }]);
  };

  return (
    <>
     
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px',
          width: '60px', height: '60px', borderRadius: '50%',
          backgroundColor: '#e84393', color: '#fff',
          border: 'none', fontSize: '24px', cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)', zIndex: 1000}}>💬
      </button>

     
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '20px',
          width: '320px', height: '400px', backgroundColor: '#fff',
          borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000
        }}>
        
          <div style={{
            backgroundColor: '#e84393', color: '#fff', padding: '15px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontWeight: 'bold'
          }}>
            <span>Satya Support</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✖</button>
          </div>

          
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === "user" ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  backgroundColor: msg.sender === "user" ? '#e84393' : '#e0e0e0',
                  color: msg.sender === "user" ? '#fff' : '#333',
                  padding: '10px 15px', borderRadius: '15px', maxWidth: '85%', fontSize: '14px'
                }}>
                  {msg.text}
                </div>
                {msg.action === "payment" && (
                  <button 
                    onClick={handlePayment}
                    style={{
                      marginTop: '8px', padding: '8px 16px', backgroundColor: '#2d3436', 
                      color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer',
                      fontSize: '13px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                  >
                    💳 Proceed to Payment
                  </button>
                )}
              </div>
            ))}
          </div>

        
          <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd', backgroundColor: '#fff' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '20px', outline: 'none' }}
            />
            <button onClick={handleSend} style={{
              marginLeft: '10px', padding: '10px 15px',
              backgroundColor: '#e84393', color: '#fff',
              border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
