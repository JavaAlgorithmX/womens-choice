import { useEffect, useState } from "react";
import AddProductForm from "./AddProduct";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import AdminProductCard from "./AdminProductCard";

export default function ManageProduct() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [products, setProducts] = useState([]); // State to store products
  const { db } = useFirebase(); // Get the Firestore instance from the Firebase context

  function handleAddProductSelect() {
    setIsAddProduct(true);
  }

  function handleEditSelect() {
    setIsAddProduct(false);
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
      <div className="relative w-full bg-blue-500 h-16 rounded-md flex space-x-5 justify-around items-center text-xl px-1 py-1 mb-3">
        <div
          onClick={handleAddProductSelect}
          className="w-1/2 flex items-center justify-center"
        >
          Add Product
        </div>
        <div
          onClick={handleEditSelect}
          className="w-1/2 flex items-center justify-center"
        >
          Edit Product
        </div>
        <div
          className={`drop-shadow-md border-2 border-yellow-500  absolute h-14 bg-green-500 w-1/2 rounded-md  ${
            !isAddProduct ? "right-1" : "-left-3"
          } top-1  flex items-center justify-center text-white`}
        >
          {isAddProduct ? "Add Product" : "Edit Product"}
        </div>
      </div>
      {isAddProduct && (
        <div>
          <AddProductForm isEdit={false} />
        </div>
      )}
      {!isAddProduct && (
        <div className="space-y-2">
          <div>Edit Product</div>
          {products.map((product,index) => (
            <AdminProductCard key={index} productData={product}/>
            // <li key={product.id}>{product.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
