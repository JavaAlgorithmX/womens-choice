import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Header from "./components/Header";
import AdminDashboard from "./components/Admin/Admindashboard";

const App = () => {
  const [cart, setCart] = useState([]);
  const items = [
    {
      id: 1,
      name: `Women's Choice Dry Regular(7)`,
      boxSize:120,
      boxDiscount:10,
      // mrp: 29,
      mrp: 100,
      discount: 30,
      image: "./product1.png",
    },
    {
      id: 2,
      name: `Women's Choice Dry XL(7)`,
      boxSize:108,
      boxDiscount:2,
      mrp: 39,
      discount: 20,
      image: "./product2.png",
    },
    {
      id: 3,
      name: `Women's Choice Dry Regular(20)`,
      boxSize:40,
      boxDiscount:2,
      mrp: 79,
      discount: 40,
      image:"./product3.png"
    },
    {
      id: 4,
      name: `Women's Choice Dry XL(18)`,
      boxSize:40,
      boxDiscount:2,
      mrp: 99,
      discount: 10,
      image:
        "https://m.media-amazon.com/images/I/61xtTaATvKL._SX679_PIbundle-16,TopRight,0,0_AA679SH20_.jpg",
    },
    {
      id: 5,
      name: `Women's Choice Dry XL(40)`,
      boxSize:20,
      boxDiscount:2,
      mrp: 199,
      discount: 5,
      image:
        "https://m.media-amazon.com/images/I/61xtTaATvKL._SX679_PIbundle-16,TopRight,0,0_AA679SH20_.jpg",
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-blue-200 to-cyan-200">
        <Header cart={cart} />
        <div className="px-4 py-2 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products items={items} addToCart={addToCart}/>}
            />
            <Route
              path="/admin"
              element={<AdminDashboard/>}
            />
            <Route
              path="/cart"
              element={<Cart 
                cart={cart} 
                removeFromCart={removeFromCart}
                 />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
