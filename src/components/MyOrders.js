import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { formatDate } from "../utils/utility";

import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const navigate = useNavigate();
  const { auth, db } = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (auth.currentUser) {
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", auth.currentUser.uid),
            orderBy("createdAt", "desc") // Sorting by timestamp in descending order
          );
          const querySnapshot = await getDocs(q);
          const fetchedOrders = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push({ id: doc.id, ...doc.data() });
          });
          setOrders(fetchedOrders);
          // console.log(orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [auth.currentUser, db]);

  function navigateToProducts(){
    navigate("/products")
  }

  function navigateToOrderDetails(orderId) {
    // console.log(orders);
    navigate(`/my-orders/${orderId}`);
  }

  function CustOrderCard({ order }) {
    return (
      <div
        onClick={() => {
          navigateToOrderDetails(order.id);
        }}
        className="bg-slate-100 drop-shadow-md px-2 py-2"
      >
        <div>Ordered At : {formatDate(order.createdAt)}</div>
        <div>Status : {order.status}</div>
        <div>Total Amount : {order.totalAmount}</div>
       
      </div>
    );
  }

  return (
    <div className="pt-20 px-4">
      <h1 className="pb-5 text-2xl">My Orders</h1>
      {orders.length === 0 ? (
        <div className="h-96 py-20 my-28 text-2xl flex flex-col space-y-5 items-center justify-center">
          <p className="text-red-400">You haven't ordered yet</p>
          <div>View our Products</div>
          <div onClick={navigateToProducts} className="px-10 text-green-900 py-2 bg-green-400 drop-shadow-md rounded-md">Products</div>
        </div>
        
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <CustOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
