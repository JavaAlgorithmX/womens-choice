import { useState } from "react";
import AddProductForm from "./AddProduct";

export default function ManageProduct() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  function handleAddProductSelect() {
    setIsAddProduct(true);
  }

  function handleEditSelect() {
    setIsAddProduct(false);
  }

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
      {isAddProduct && 
        <div><AddProductForm /></div>
      }
      {!isAddProduct && 
        <div>Edit Product</div>
      }
      
    </div>
  );
}
