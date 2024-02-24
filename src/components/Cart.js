import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { BsCartX } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Cart = ({ cart, removeFromCart }) => {
  const { currentUser, userMobile, db } = useFirebase();
  const navigate = useNavigate();

  function handlePlaceOrder() {
    // Prepare the order data
    const orderData = {
      userId: currentUser.uid, // Assuming you have the current user object available
      userName: currentUser.displayName,
      userMobile: userMobile,
      products: cart.map((item) => ({
        productId: item.item.id,
        quantity: item.quantity,
        isBox: item.isBox,
        discount: item.item.discount,
        boxDiscount: item.item.boxDiscount,
      })),
      totalAmount: calculateTotalPayableAmount(),
      status: "pending", // Set the initial status of the order
      createdAt: serverTimestamp(), // Timestamp indicating when the order was placed
    };
    console.log("order data-> ", orderData);

    // Add the order data to Firestore
    addDoc(collection(db, "orders"), orderData)
      .then((docRef) => {
        console.log("Order placed successfully with ID: ", docRef.id);
        // Navigate to the order success page or show a confirmation message
      })
      .catch((error) => {
        console.error("Error placing order: ", error);
      });
  }
  function navigateToProducts() {
    navigate("/products");
  }
  const calculateTotalMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemMRP = cartItem.isBox
          ? cartItem.quantity * cartItem.item.mrp * cartItem.item.boxSize
          : cartItem.quantity * cartItem.item.mrp;
        return total + itemMRP;
      }, 0)
      .toFixed(2);
  };
  const calculateTotalDiscountOnMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemDiscount = !cartItem.isBox
          ? cartItem.quantity *
            ((cartItem.item.mrp * cartItem.item.discount) / 100)
          : cartItem.item.boxSize *
            cartItem.quantity *
            ((cartItem.item.mrp * cartItem.item.discount) / 100);
        return total + itemDiscount;
      }, 0)
      .toFixed(2);
  };
  const calculateTotalBoxDiscountOnMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemDiscount = cartItem.isBox
          ? (cartItem.quantity *
              cartItem.item.boxSize *
              cartItem.item.mrp *
              cartItem.item.boxDiscount) /
            100
          : 0;
        return total + itemDiscount;
      }, 0)
      .toFixed(2);
  };
  const calculateTotalPayableAmount = () => {
    return (
      calculateTotalMRP() -
      calculateTotalDiscountOnMRP() -
      calculateTotalBoxDiscountOnMRP()
    );
  };

  function OrderCard({ orderItem }) {
    return (
      <div className="relative bg-slate-300 px-2 py-2 rounded-md flex space-x-2">
        <div>
          <img src={orderItem.item.image} alt="" className="h-28 w-28" />
        </div>
        <div>
          <h2 className="text-xl">{orderItem.item.name}</h2>
          <h1>MRP: {orderItem.item.mrp}</h1>
          <h1>Type: {orderItem.isBox ? "Box" : "Pc"}</h1>
          {/* <div className="flex space-x-3 justify-center items-center ">
            <div>Quantity </div>
            <div className="text-xl font-bold rounded-md ">
              <CiSquareMinus></CiSquareMinus>
            </div>
            <div>{orderItem.quantity}</div>
            <div className=" font-bold rounded-md  text-xl">
              <CiSquarePlus />
            </div>
          </div> */}
          <h1>Quantity: {orderItem.quantity}</h1>
          <div
            className="text-2xl absolute top-1 right-1 text-red-400"
            onClick={() => removeFromCart(orderItem)}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    );
  }
  function OrderTotal({ cart }) {
    return (
      <div className="bg-slate-400 rounded-md px-2 py-2">
        <h2 className="py-2">PRICE DETAILS ({cart.length} Items)</h2>
        <hr />
        <div className="py-2">
          <div className="flex items-center justify-between">
            <div>Total MRP</div>
            <div>{calculateTotalMRP()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>discount on MRP</div>
            <div>{calculateTotalDiscountOnMRP()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Box Discount</div>
            <div>{calculateTotalBoxDiscountOnMRP()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Shipping Fee</div>
            <div>FREE</div>
          </div>
        </div>
        <hr />
        <div className="py-2 flex items-center justify-between">
          <div>Total Amount</div>
          <div>{calculateTotalPayableAmount()}</div>
        </div>
      </div>
    );
  }
  function CartProductView() {
    return (
      <div className="min-h-screen space-y-2 pt-20 px-4 bg-gradient-to-r from-fuchsia-600 to-purple-600">
        <h2 className="text-2xl font-semibold text-slate-600">CHECKOUT</h2>

        {/* order  */}
        <div className="bg-slate-400 px-2 py-2 space-y-2 rounded-md">
          <h2>My Order</h2>
          {cart.map((item, index) => (
            <OrderCard key={index} orderItem={item} />
          ))}
        </div>
        <div className="bg-green-500 rounded-md px-2 py-2">
          you are saving{" "}
          {(calculateTotalMRP() - calculateTotalPayableAmount()).toFixed(2)} on
          this Order
        </div>
        {cart.length > 0 && <OrderTotal cart={cart} />}
        <div
          onClick={handlePlaceOrder}
          className="w-full px-3 py-3 bg-blue-600 rounded-md flex items-center justify-center text-2xl text-white"
        >
          Place Order
        </div>

        <div
          onClick={navigateToProducts}
          className="w-full px-3 py-3 bg-blue-600 rounded-md flex items-center justify-center text-2xl text-white"
        >
          Add More Products
        </div>
      </div>
    );
  }
  function CartEmptyView() {
    return (
      <div className="h-screen flex items-center justify-center flex-col space-y-5">
        <div className="text-3xl text-red-400">Your Cart is Empty!</div>
        <div className="text-8xl text-slate-500">
          <BsCartX />
        </div>
        <div
          onClick={navigateToProducts}
          className="px-2 py-2 bg-slate-300 rounded-md drop-shadow-md w-1/2 text-center text-xl"
        >
          Add Product To Cart
        </div>
      </div>
    );
  }

  return (
    <div>
      {cart.length === 0 && <CartEmptyView />}
      {cart.length > 0 && <CartProductView />}
    </div>
  );
};
export default Cart;
