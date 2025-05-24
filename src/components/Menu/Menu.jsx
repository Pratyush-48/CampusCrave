import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FoodItem from '../FoodItem/FoodItem';
import './Menu.css';

const menuCategories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    items: [
      {
        id: 'pancakes',
        name: 'Fluffy Pancakes',
        description: 'Stack of three fluffy pancakes with maple syrup',
        price: 99,
        image: '/images/pancakes.jpeg',
        veg: true,
      },
      {
        id: 'omelette',
        name: 'Cheese Omelette',
        description: 'Three-egg omelette with cheddar cheese and herbs',
        price: 49,
        image: '/images/omelette.jpeg',
        veg: false,
      },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    items: [
      {
        id: 'coffee',
        name: 'Cappuccino',
        description: 'Freshly brewed cappuccino with milk foam',
        price: 49,
        image: '/images/coffee.jpeg',
        veg: true,
        category: 'not-spicy',
      },
      {
        id: 'smoothie',
        name: 'Berry Smoothie',
        description: 'Mixed berry smoothie with yogurt and honey',
        price: 99,
        image: '/images/smoothie.jpeg',
        veg: true,
        category: 'not-spicy',
      },
    ],
  },
  {
    id: 'mains',
    name: 'Main Course',
    items: [
      {
        id: 'pasta',
        name: 'Creamy Alfredo Pasta',
        description: 'Penne pasta in creamy Alfredo sauce with herbs',
        price: 99,
        image: '/images/pasta.jpeg',
        veg: true,
      },
      {
        id: 'burger',
        name: 'Grilled Chicken Burger',
        description: 'Grilled chicken patty with lettuce and spicy mayo',
        price: 49,
        image: '/images/burger.jpeg',
        veg: false,
      },
    ],
  },

  {
    id: 'salads',
    name: 'Salads',
    items: [
      {
        id: 'caesar-salad',
        name: 'Classic Caesar Salad',
        description: 'Romaine lettuce, croutons, parmesan, and Caesar dressing',
        price: 99,
        image: '/images/caesar-salad.jpeg',
        veg: true,
        
      },
      {
        id: 'greek-salad',
        name: 'Greek Salad',
        description: 'Cucumber, tomatoes, olives, feta cheese, and olive oil',
        price: 49,
        image: '/images/greek-salad.jpeg',
        veg: true,
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 'chocolate-cake',
        name: 'Chocolate Fudge Cake',
        description: 'Rich and moist chocolate cake with fudge frosting',
        price: 49,
        image: '/images/chocolate-cake.jpeg',
        veg: true,
        category: 'not-spicy'
      },
      {
        id: 'fruit-tart',
        name: 'Fresh Fruit Tart',
        description: 'Seasonal fruits on a creamy custard tart base',
        price: 99,
        image: '/images/fruit-tart.jpeg',
        veg: true,
        category: 'not-spicy'
      },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks',
    items: [
      {
        id: 'spring-rolls',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy rolls stuffed with mixed veggies and spices',
        price: 99,
        image: '/images/spring-rolls.jpeg',
        veg: true,
      },
      {
        id: 'chicken-wings',
        name: 'Spicy Chicken Wings',
        description: 'Hot and spicy fried chicken wings with dip',
        price: 99,
        image: '/images/chicken-wings.jpeg',
        veg: false,
      },
    ],
  },
];


export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Fixed filteredCategories logic
  const filteredCategories = menuCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <section className="menu-section">
      <div className="container">
        {/* <img src="/images/campuscrave-logo.png" alt="CampusCrave Logo" className="logo" /> */}
        <h2 className="section-title">Today's Menu</h2>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="category-tabs">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              className={`tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {filteredCategories.map((category) => (
            activeCategory === category.id && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="menu-items"
              >
                <div className="grid">
                  {category.items.map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}