import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import UserDetails from "./userDetailsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function AdminOrderCard({order , setOrderData}){
    // const [userData, setUserData] = useState(null);
    const { db } = useFirebase();
    // Function to fetch user data based on userId
    const navigate = useNavigate();

    const getUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.error('User document not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  async function getUserDataHandle(){
    const userData = await getUserData("pRpE1dSFgEPeP6hkblFM8O05X4B3");
    console.log("User Data--> ",userData);
  }

  // Fetch user data when component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const data = await getUserData(order.userId);
//       setUserData(data);
//     };
//     fetchUserData();
//   }, [db, getUserData, order.userId]);
    // Function to format the timestamp to a readable date format
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp.seconds * 1000);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };
const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Set to true to use 12-hour clock format
    };
    return date.toLocaleDateString('en-US', options);
};
  function showOrderDetails(order){
    setOrderData(order);
    navigate(`/admin/order/${order.id}`);
  }
// 
    return(
        <div onClick={()=>{showOrderDetails(order.id)}}  className="bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-2 rounded-md">
            {/* <div className="text-slate-50">Order ID :  <span className="text-slate-200 px-2">{order.id}</span></div> */}
            <div className="text-slate-50">Order Date :  <span className="text-slate-200 px-2">{formatDate(order.createdAt)}</span></div>
            <div className="text-slate-50">Status :  <span className="text-slate-200 px-2">{order.status}</span></div>
            <div className="text-slate-50">Order Amount : <span className="text-slate-200 px-2">{order.totalAmount}</span> </div>
            <div className="text-slate-50">Order By : <span className="text-slate-200 px-2">{order.userName}</span> </div>
            <div className="text-slate-50">Contact : <span className="text-slate-200 px-2">{order.userMobile}</span> </div>
            
            {/* <UserDetails user={userData}/> */}
            {/* <button onClick={getUserDataHandle}>get user data</button> */}
        </div>
    )
}