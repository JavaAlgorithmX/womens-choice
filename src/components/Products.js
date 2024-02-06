import ProductCard from "./ProductCard";

const Products = ({ items, addToCart, removeFromCart }) => {
  return (
    <div className="min-h-screen space-y-2 pt-20 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 pb-5">
      <h2 className="text-4xl text-white drop-shadow-md">Products</h2>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard
          item={item}
            addToCart={addToCart} 
           removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
