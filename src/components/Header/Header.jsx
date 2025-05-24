import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { totalItems, toggleCart } = useCart();

  return (
    <motion.header 
      className={`header ${darkMode ? "dark" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
    >
      <div className="container header-content">
        <Link to="/" className="logo" aria-label="College Eats Home">
          <h1>CampusCrave</h1>
        </Link>
        
        <nav className="nav">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/home" className="nav-link">Menu</Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/my-orders" className="nav-link">My Orders</Link>
          </motion.div>
          
          <motion.button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            whileHover={{ scale: 1.2, rotate: 20 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {darkMode ? (
              <span className="sun-icon" role="img" aria-label="Sun">☀️</span>
            ) : (
              <span className="moon-icon" role="img" aria-label="Moon">🌙</span>
            )}
          </motion.button>
          
          <motion.div 
            className="cart-icon-wrapper" 
            onClick={toggleCart}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            role="button"
            aria-label="Toggle cart"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleCart()}
          >
            <svg className="cart-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.89 18 5 18.89 5 20s0.89 2 2 2 2-0.89 2-2-0.89-2-2-2zm10 0c-1.11 0-2 0.89-2 2s0.89 2 2 2 2-0.89 2-2-0.89-2-2-2zM7.16 14H18a1 1 0 0 0 .92-.63l3.24-8.09A1 1 0 0 0 21.25 4H5.21L4.27 2H1v2h2l3.6 7.59-1.35 2.45c-.17.3-.25.65-.25 1.02 0 1.1.9 2 2 2H19v-2H7.42c-.13 0-.25-.11-.25-.25l.03-.12.96-1.63z"/>
            </svg>

            {totalItems > 0 && (
              <motion.span 
                className="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={totalItems}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {totalItems}
              </motion.span>
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
