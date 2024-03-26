import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  // Function to save cart data to local storage
  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Function to retrieve cart data from local storage
  const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // Update cart data state when component mounts
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart.length > 0) {
      setCartData(savedCart);
    }
  }, []);

  // Add item to cart
  const addToCart = (newItem) => {
    // const existingItemIndex = cart.findIndex((item) => item.item.id === newItem.item.id);
    // console.log("add to cart from context started");
    // console.log("new item ->",newItem);
    const existingItemIndex = cartData.findIndex((item) => {
        // console.log("Item -> ",item);
      // Check if the item ID and box type are the same
      return item.item.id === newItem.item.id && item.isBox === newItem.isBox;
    });
    // console.log("existingItemIndex -> ",existingItemIndex);
    if (existingItemIndex !== -1) {
      // If the item already exists in the cart
      const existingItem = cartData[existingItemIndex];
      // Check if the box type is the same
      if (existingItem.isBox === newItem.isBox) {
        // If the box type is the same, update its quantity
        const updatedCart = cartData.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity,
            };
          }
          return item;
        });
        setCartData(updatedCart);
        saveCartToLocalStorage(updatedCart);
      } else {
        setCartData([...cartData, newItem]);
        saveCartToLocalStorage([...cartData, newItem]);
      }
    } else {
      setCartData([...cartData, newItem]);
      saveCartToLocalStorage([...cartData, newItem]);
    }
    
    // saveCartToLocalStorage([cartData]);
  };

  // Remove item from cart
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartData.filter((item) => item.item.id !== itemToRemove.item.id || item.isBox !== itemToRemove.isBox);
    setCartData(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const updateQuantity = (updatedItem, newQuantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.item.id === updatedItem.item.id && item.isBox === updatedItem.isBox) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartData(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCartData([]);
    saveCartToLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{ cartData, addToCart, removeFromCart, clearCart,updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
