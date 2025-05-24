import { motion, AnimatePresence } from 'framer-motion';
import './OrderConfirmation.css';

export default function OrderConfirmation({ isOpen, onClose, total }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="confirmation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="confirmation-modal"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3>Order Confirmed!</h3>
            <p>Your order of ₹{total.toFixed(2)} has been placed successfully.</p>
            <button className="confirm-btn" onClick={onClose}>OK</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
