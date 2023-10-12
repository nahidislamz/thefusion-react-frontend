import React, { useEffect ,useState} from "react";
import scrollreveal from "scrollreveal";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import About from './containers/About';
import ScrollToTop from "./components/ScrollToTop";
import Menus from "./containers/Menus";
import { CartProvider } from './context/CartContext';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_x0a3VuPvX5kedZC5InT5M4tY00ddR41quZ'); 

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        #home,
        #services,
        #portfolio,
        #testimonials,
        #products,
        #newsletter,
        .footer
    `,
      {
        opacity: 0,
        interval: 200,
      }
    );
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/category/all'); 
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/menu/all');  // Fetch all menu items
                setMenuItems(response.data);  // Store fetched items to state
            } catch (error) {
                console.error('Error fetching menu items: ', error);
            }
        };

        fetchMenuItems();

        fetchCategories();


  }, []);
  return (
    <>
    <CartProvider>
    <Elements stripe={stripePromise}>
    <Header/>
      <About/>
      <Menus menuItems={menuItems} />
      <Footer/>
      <ScrollToTop/>
    </Elements>
    </CartProvider>
    </>
  );
}
