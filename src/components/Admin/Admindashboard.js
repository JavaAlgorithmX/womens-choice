import { useState, useEffect } from "react";
import EnquiryCard from "../EnquiryCard";
// import AdminMenu from "./AdminNav";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";
import AdminOrderCard from "./AdminOrderCard";
import { useNavigate } from "react-router-dom";


// Function to fetch enquiries from Firestore
async function fetchEnquiries(db) {
  const enquiriesCollection = collection(db, "inquiries"); // Assuming "enquiries" is the name of your Firestore collection
  const snapshot = await getDocs(enquiriesCollection);
  const enquiriesData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return enquiriesData;
}

async function fetchOrders(db) {
  const orderCollection = collection(db, "orders"); // Assuming "enquiries" is the name of your Firestore collection
  const snapshot = await getDocs(orderCollection);
  const ordersData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return ordersData;
}

export default function AdminDashboard({setOrderData}) {
  const [isOrderSelected, setIsOrderSelected] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { db } = useFirebase();

  useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersData = await fetchOrders(db);
      setOrders(ordersData);
    };
    fetchOrdersData();
    // Fetch enquiries when the component mounts
    const fetchEnquiriesData = async () => {
      const enquiriesData = await fetchEnquiries(db);
      setEnquiries(enquiriesData);
    };
    fetchEnquiriesData();
    
  }, [db]);

  function handleEnquirySelect() {
    console.log("enquiry -->", enquiries);
    setIsOrderSelected(false);
  }

  function handleOrderSelect() {
    setIsOrderSelected(true);
    console.log("Orders -> ",orders);
  }

  function Enquiry() {
    return (
      <div className=" w-full bg-slate-400 rounded-md px-2 py-2">
        Enquiry
        {enquiries.map((inquiry, index) => (
          <EnquiryCard key={index} inquiry={inquiry} />
        ))}
      </div>
    );
  }
  // const handleOrderClick = (order) => {
  //   setOrderData(order);
  //   console.log(order)
  //   // Navigate to the order details page
  //   navigate(`/admin/order/${order.id}`)
  // };

  function Order({setOrderData}) {
    return (
      <div className=" w-full bg-slate-400 rounded-md px-2 py-2 space-y-3">
        Order
        {orders.map((order,index)=>(
          // <div key={index}>{order.id}</div>
          <AdminOrderCard  key={index} order={order} setOrderData={setOrderData}/>
        ))}
        </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xl">Admin Dashboard</p>
      </div>

      <div className="relative w-full bg-blue-500 h-16 rounded-md flex space-x-5 justify-around items-center text-xl px-1 py-1 mb-3">
        <div
          onClick={handleEnquirySelect}
          className="w-1/2 flex items-center justify-center"
        >
          Enquiry
        </div>
        <div
          onClick={handleOrderSelect}
          className="w-1/2 flex items-center justify-center"
        >
          Order
        </div>
        <div
          className={`drop-shadow-md border-2 border-yellow-500  absolute h-14 bg-green-500 w-1/2 rounded-md  ${
            isOrderSelected ? "right-1" : "-left-3"
          } top-1  flex items-center justify-center text-white`}
        >
          {isOrderSelected ? "Order" : "Enquiry"}
        </div>
      </div>
      {isOrderSelected && <Order setOrderData={setOrderData} />}
      {!isOrderSelected && <Enquiry />}
    </div>
  );
}
