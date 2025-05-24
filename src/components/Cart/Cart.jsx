import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart() {
  const {
    cartItems,
    isCartOpen,
    totalPrice,
    totalItems,
    removeFromCart,
    updateQuantity,
    toggleCart,
    placeOrder,
  } = useCart();

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          >
            <motion.div
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <header className="cart-header">
                <h3>Your Cart ({totalItems})</h3>
                <button className="close-btn" onClick={toggleCart} aria-label="Close cart">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </header>

              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <div className="empty-cart">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Your cart is empty</p>
                    <button className="browse-btn" onClick={toggleCart}>
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.cartId}
                      className="cart-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <div className="item-meta">
                          <span className="price">₹{item.price.toFixed(2)}</span>
                          {item.spiceLevel && <span className="spice-level">{item.spiceLevel}</span>}
                        </div>
                        {item.specialInstructions && (
                          <p className="special-instructions">{item.specialInstructions}</p>
                        )}
                        <div className="item-controls">
                          <div className="quantity-selector">
                            <button
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.cartId)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <footer className="cart-footer">
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax (10%)</span>
                      <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>₹{(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.button
                    className="checkout-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={placeOrder}
                  >
                    Place Order (₹{(totalPrice * 1.1).toFixed(2)})
                  </motion.button>
                </footer>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
