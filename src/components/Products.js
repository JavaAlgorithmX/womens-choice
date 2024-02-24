import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../context/FirebaseContext";


const Products = ({ items, addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { db } = useFirebase();
  
  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products"); // Assuming "products" is the name of your Firestore collection
        const querySnapshot = await getDocs(productsCollection);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        // console.log(productsData)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [db]);

  return (
    <div className="min-h-screen space-y-2 pt-20 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 pb-5">
      <h2 className="text-4xl text-white drop-shadow-md">Products</h2>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard
            key={item.id}
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
