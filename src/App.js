import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Notification from './components/Notification/Notification';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyOrders from './pages/MyOrders/MyOrders';
import NotFound from './pages/NotFound/NotFound';
import LandingPage from './pages/LandingPage/LandingPage';
import './assets/styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <Notification />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
