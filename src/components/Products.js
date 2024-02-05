// import React, { useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ items,addToCart }) => {
  // const [cart, setCart] = useState([]);

  // const addToCart = (item) => {
  //   setCart([...cart, item]);
  // };

  return (
    <div className="min-h-screen space-y-2 pt-20">
      <h2 className="text-4xl text-white drop-shadow-md">Products</h2>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard
          item={item}
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
