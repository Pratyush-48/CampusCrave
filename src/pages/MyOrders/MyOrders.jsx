import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Orders from '../../components/Orders/Orders';
import './MyOrders.css';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    document.title = 'CampusCrave-Orders';
    
    // Simulate fetching orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
    
    // Simulate order status updates for demo purposes
    if (savedOrders.length > 0) {
      const interval = setInterval(() => {
        setOrders(prevOrders => {
          const updatedOrders = [...prevOrders];
          const randomOrderIndex = Math.floor(Math.random() * updatedOrders.length);
          
          if (updatedOrders[randomOrderIndex].status === 'Preparing') {
            updatedOrders[randomOrderIndex].status = 'Ready for Pickup';
          } else if (updatedOrders[randomOrderIndex].status === 'Ready for Pickup') {
            updatedOrders[randomOrderIndex].status = 'Completed';
          }
          
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
          return updatedOrders;
        });
      }, 10000); // Update every 10 seconds for demo
      
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="orders-page"
    >
      <div className="container">
        <h2 className="section-title">My Orders</h2>
        <Orders orders={orders} />
      </div>
    </motion.main>
  );
}