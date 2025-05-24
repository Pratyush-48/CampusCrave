import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setCartItems(savedCart);
    setOrders(savedOrders);
  }, []);

  // Save to localStorage when changes occur
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [cartItems, orders]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => 
        i.id === item.id && 
        i.spiceLevel === item.spiceLevel &&
        i.specialInstructions === item.specialInstructions
      );
      
      return existingItem
        ? prev.map(i => 
            i.cartId === existingItem.cartId 
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, { ...item, cartId: uuidv4() }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const placeOrder = () => {
  if (cartItems.length === 0) return;
  
  const newOrder = {
    id: uuidv4(),
    date: new Date().toISOString(),
    items: [...cartItems],
    total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'Preparing'
  };

  setOrders(prev => [newOrder, ...prev]);
  setCartItems([]);
  
  // Show centered notification
  setNotification({
    message: `Your delicious order will be ready in 15-20 minutes!`,
    amount: newOrder.total
  });
  
  setTimeout(() => setNotification(null), 5000);
};

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      orders,
      notification,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      addToCart,
      removeFromCart,
      updateQuantity,
      placeOrder,
      toggleCart: () => setIsCartOpen(!isCartOpen)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);