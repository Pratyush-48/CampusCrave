import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="not-found"
    >
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Go back to the menu
        </Link>
      </div>
    </motion.div>
  );
}