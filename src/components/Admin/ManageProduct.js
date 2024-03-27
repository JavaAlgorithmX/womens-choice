import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import AdminProductCard from "./AdminProductCard";
import { useNavigate } from "react-router-dom";

export default function ManageProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store products
  const { db } = useFirebase(); // Get the Firestore instance from the Firebase context

  function navigateToAddProduct(){
    navigate("/admin/product/add-new")
  }

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
    <div>
      <div className="space-y-2">
        <div className="text-2xl flex items-center justify-between">
          <div>Product</div>
          <div onClick={navigateToAddProduct}  className="cursor-pointer px-4 py-2 bg-blue-500 rounded-md drop-shadow-md text-white">
            Add New
          </div>
        </div>
        {products.map((product, index) => (
          <AdminProductCard key={index} productData={product} />
        ))}
      </div>
    </div>
  );
}
