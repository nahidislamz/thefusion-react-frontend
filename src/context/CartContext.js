import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

// Effect for fetching menu data
useEffect(() => {
    //localStorage.setItem("cart", JSON.stringify());
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/menu/all");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items: ", error);
      }
    };
    
    fetchMenuItems();
  }, []); // No dependencies here as we only want this to run on mount
  

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setCart(items);
    }
  }, []);

  
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart && !cart.length) { // Example condition, adapt as needed
      setCart(JSON.parse(savedCart));
    }
  }, [cart]); // Depending only on cartProducts to avoid loop with `setCart`



  // Load cart from localStorage when component mounts

  const getProductData = (id) => {
    return menuItems.find((item) => item.id === id);
  };

  const getProductQuantity = (id) => {
    const quantity = cart.find((product) => product.id === id)?.quantity;
    return quantity ?? 0;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);
    setCart((current) =>
      quantity === 0
        ? [...current, { id, quantity: 1 }]
        : current.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
    );
  };

  const removeOneFromCart = (id) => {
    // Retrieve the cart from localStorage and parse it to an object
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Find the product quantity
    const product = currentCart.find((item) => item.id === id);
    const quantity = product ? product.quantity : 0;
  
    let newCart;
    if (quantity <= 1) {
      // Remove the product from the cart entirely
      newCart = currentCart.filter((item) => item.id !== id);
    } else {
      // Reduce the product's quantity by 1
      newCart = currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
  
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart)
    // If using state to re-render component, update it accordingly
    // setCart(newCart); 
  };
  

  const deleteFromCart = (id) => {
    // Retrieve the cart from localStorage and parse it to an object
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Filter out the item with the given id
    const newCart = currentCart.filter((product) => product.id !== id);
    
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));
  
    setCart(newCart);
  };
  

  const getTotalCost = () => {
    return cart.reduce((total, item) => {
      const productData = getProductData(item.id);
      if (!productData) {
        console.error(`No product found for ID: ${item.id}`);
        return total; // Skip item in total cost calculation
      }
      return total + productData.price * item.quantity;
    }, 0);
  };
  

  const contextValue = {
    items: cart,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
