import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MyOrders(){
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
            } catch (error) {
              console.error("Error fetching orders:", error);
            }
          }
        };
    
        fetchOrders();
      }, [auth.currentUser, db]);


    return(
        <div className="mt-20 px-4 py-2">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              {/* Render order details here */}
              <p>Order ID: {order.id}</p>
              {/* Render other order details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
}