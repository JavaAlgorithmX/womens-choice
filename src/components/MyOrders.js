import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { formatDate } from "../utils/utility";

import { useNavigate } from "react-router-dom";

export default function MyOrders(){
    const navigate = useNavigate();
    const { auth, db } = useFirebase();
    const [orders, setOrders] = useState([]);

   
    useEffect(() => {
        const fetchOrders = async () => {
          if (auth.currentUser) {
            try {
              const q = query(
                collection(db, "orders"),
                where("userId", "==", auth.currentUser.uid)
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

      function navigateToOrderDetails(orderId){
        console.log(orders);
                  navigate(`/my-orders/${orderId}`)
      }

      function CustOrderCard({order}){
        return(
          <div onClick={()=>{navigateToOrderDetails(order.id);}} className="bg-slate-100 drop-shadow-md px-2 py-2">
            <div>Ordered At : {formatDate(order.createdAt)}</div>
            <div>Status : {order.status}</div>
            <div>Total Amount : {order.totalAmount}</div>
            <div>{order.id}</div>
          </div>
        );
      }

     

      // Function to fetch product details for a given order
  const fetchProductDetails = async (productIds) => {
    const productDetails = [];
    for (const productId of productIds) {
      const docRef = db.collection("products").doc(productId);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists()) {
        productDetails.push({ id: productId, ...docSnapshot.data() });
      }
    }
    return productDetails;
  };

 
    
    return(
      <div className="pt-20 px-4">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <CustOrderCard key={order.id} order={order}/>
          ))}
        </div>
      )}
    </div>
    );
}