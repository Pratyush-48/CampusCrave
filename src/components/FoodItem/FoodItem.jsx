// File: src/components/FoodItem/FoodItem.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './FoodItem.css';

export default function FoodItem({ item }) {
  const { darkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity,
      spiceLevel,
      specialInstructions,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`food-item ${darkMode ? 'dark' : ''}`}
    >
      <div className="food-image">
        <motion.img
          src={item.image}
          alt={item.name}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        {item.veg ? (
          <span className="veg-indicator">🥦 Veg</span>
        ) : (
          <span className="non-veg-indicator">🍗 Non-Veg</span>
        )}
      </div>

      <div className="food-details">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <p className="price">₹{item.price.toFixed(2)}</p>

        <div className="customization">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>

          {item.category !== 'not-spicy' && (
        <div className="spice-level">
          <label>
            Spice Level <span role="img" aria-label="chilli">🌶️</span>:
          </label>
          <select
            value={spiceLevel}
            onChange={(e) => setSpiceLevel(e.target.value)}
          >
            <option value="mild">Mild</option>
            <option value="medium">Medium</option>
            <option value="hot">Hot</option>
            <option value="extra-hot">Extra Hot</option>
          </select>
        </div>
      )}


          <div className="special-instructions">
            <label>Special Instructions:</label>
            <input
              type="text"
              placeholder="Any special requests?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
