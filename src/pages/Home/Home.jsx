import { useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import Cart from '../../components/Cart/Cart';
import './Home.css';

export default function Home() {
  useEffect(() => {
    document.title = 'CampusCrave';
  }, []);

  return (
    <main className="home-page">
      <Menu />
      <Cart />
    </main>
  );
}