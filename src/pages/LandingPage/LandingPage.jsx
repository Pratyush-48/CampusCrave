import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('light-theme');
  }, []);

  // Button hover animations
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(56, 176, 0, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const buttonTap = {
    scale: 0.95
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow">Hungry? We've got you</div>
            <h1>
              <span className="gradient-text">CampusCrave</span> 
              <br />Your Ultimate Food Companion
            </h1>
            <p className="subhead">
              Order from 50+ campus eateries in minutes. Student discounts applied automatically!
            </p>
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button 
              className="primary-btn"
              onClick={() => navigate('/home')}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Start Ordering
              <motion.span 
                className="icon"
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </motion.button>
            <motion.button 
              className="secondary-btn"
              onClick={() => navigate('/home')}
              whileHover={{
                ...buttonHover,
                backgroundColor: "rgba(56, 176, 0, 0.1)"
              }}
              whileTap={buttonTap}
            >
              View Today's Deals
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img src="/images/food.png" alt="Delicious food options" />
          <motion.div 
            className="floating-badge"
            whileHover={{ rotate: [0, -5, 5, 0] }}
          >
            <div className="badge-content">Starting @₹49</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Students Love Us
        </motion.h2>

        <div className="features-grid">
          {[
            { icon: '🚀', title: 'Lightning Fast', desc: 'Avg. delivery in 15 mins' },
            { icon: '💸', title: 'Budget Friendly', desc: 'Meals from ₹49' },
            { icon: '🍱', title: 'Diverse Menu', desc: '100+ options daily' },
            { icon: '🏆', title: 'Top Rated', desc: '4.9/5 (2k+ reviews)' }
          ].map((feature, index) => (
            <motion.div 
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(56, 176, 0, 0.15)"
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ scale: 1.1 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Items Carousel */}
      <section className="popular-section">
        <motion.div
          className="popular-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>This Week's Favorites</h2>
          <motion.button 
            className="view-all"
            onClick={() => navigate('/home')}
            whileHover={{
              color: "#38b000",
              scale: 1.05,
              textDecoration: "none"
            }}
            whileTap={buttonTap}
          >
            View All
          </motion.button>
        </motion.div>

        <div className="food-carousel">
          {[
            { name: 'Chocolate Cake', price: '₹49', image: 'chocolate-cake.jpeg' },
            { name: 'Chicken Burger', price: '₹99', image: 'burger.jpeg' },
            { name: 'Pasta', price: '₹99', image: 'pasta.jpeg' },
            { name: 'Cold Brew Coffee', price: '₹99', image: 'coffee.jpeg' }
          ].map((item, index) => (
            <motion.div 
              className="food-card"
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 15px 30px rgba(56, 176, 0, 0.2)"
              }}
            >
              <motion.div 
                className="food-image"
                whileHover={{ scale: 1.05 }}
              >
                <img src={`/images/${item.image}`} alt={item.name} />
              </motion.div>
              <div className="food-info">
                <h4>{item.name}</h4>
                <motion.div 
                  className="price"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.price}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section">
        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="quote">"CampusCrave saved me during finals! The 10-minute pickup is a game changer."</div>
          <div className="author">
            <motion.img 
              src="/images/student-avatar.jpeg" 
              alt="Student" 
              whileHover={{ rotate: 5 }}
            />
            <div>
              <div className="name">Rahul K.</div>
              <div className="role">Computer Science, 3rd Year</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to satisfy your cravings?</h2>
          <motion.button 
            className="cta-button"
            onClick={() => navigate('/home')}
            whileHover={{
              ...buttonHover,
              background: "linear-gradient(90deg, #38b000, #4caf50)"
            }}
            whileTap={buttonTap}
          >
            Order Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}