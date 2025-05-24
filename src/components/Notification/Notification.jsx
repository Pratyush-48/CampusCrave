import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import successSoundSrc from '../../assets/success.m4a'; 
import './Notification.css';

export default function Notification() {
  const { notification } = useCart();
  const { darkMode } = useTheme();
  const audioRef = useRef(null);

  useEffect(() => {
    console.log('Notification:', notification); // Debugging log
    if (notification) {
      audioRef.current?.play().catch((err) => {
        // You can handle or ignore play errors here
        console.warn('Audio play failed:', err);
      });
    }
  }, [notification]);

  // Safe values with fallbacks
  const amount = notification?.amount ? (notification.amount * 1.1).toFixed(2) : '0.00';
  const message = notification?.message || 'No message';

  return (
    <>
      <audio ref={audioRef} src={successSoundSrc} preload="auto" />
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id || Date.now()} // key to help AnimatePresence
            className={`notification ${darkMode ? 'dark' : 'light'}`}
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            role="alert"
            aria-live="assertive"
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 9999,
              padding: '1rem 1.5rem',
              borderRadius: 8,
              backgroundColor: darkMode ? '#222' : '#f0fff4',
              color: darkMode ? '#e0ffe0' : '#006400',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              maxWidth: 320,
            }}
          >
            <motion.div
              className="tick-wrapper"
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
              aria-hidden="true"
              style={{ marginBottom: 12 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tick-svg"
                width={36}
                height={36}
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  strokeDasharray="22"
                  strokeDashoffset="22"
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>

            <div
              className="notification-icon"
              aria-hidden="true"
              style={{ marginBottom: 8 }}
            >
              <svg viewBox="0 0 24 24" fill="none" width={24} height={24}>
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon-circle"
                />
                <path
                  d="M12 7v5l3 3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon-clock-hand"
                />
              </svg>
            </div>

            <div className="notification-content">
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Order Confirmed!</h3>
              <p className="amount" style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>
                ₹{amount}
              </p>
              <p className="message" style={{ margin: 0 }}>
                {message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
