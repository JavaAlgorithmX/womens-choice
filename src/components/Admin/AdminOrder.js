import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import AdminOrderCard from "./AdminOrderCard";
import { startOfToday, startOfWeek, startOfMonth, format } from "date-fns";

// async function fetchOrders(db) {
//   const orderCollection = collection(db, "orders"); // Assuming "enquiries" is the name of your Firestore collection
//   const snapshot = await getDocs(
//     query(orderCollection, orderBy("createdAt", "desc"))
//   );
//   const ordersData = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return ordersData;
// }
export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("today");
  const [customStartDate, setCustomStartDate] = useState(startOfToday());
  const [customEndDate, setCustomEndDate] = useState(startOfToday());

  const { db } = useFirebase();

  useEffect(() => {
    // const fetchOrdersData = async () => {
    //   const ordersData = await fetchOrders(db);
    //   setOrders(ordersData);
    // };
    const fetchOrdersData = async () => {
      let startDate;
      if (filter === "today") {
        startDate = startOfToday();
      } else if (filter === "week") {
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      } else if (filter === "month") {
        startDate = startOfMonth(new Date());
      } else if (filter === "custom") {
        startDate = customStartDate;
      }

      let endDate = new Date();
      // console.log("start date ->", startDate);
      // console.log("end date->", endDate);
      if (filter === "custom") {
        endDate = customEndDate;
      }

      const orderCollection = collection(db, "orders");
      const q = query(
        orderCollection,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    };
    fetchOrdersData();
  }, [customEndDate, customStartDate, db, filter]);

  const handleFilterChange = (newFilter) => {
    // setFilter(newFilter);
    setFilter(newFilter);
    // if (newFilter !== "custom") {
      // setCustomStartDate(format(startOfToday(), 'yyyy-MM-dd'));
      setCustomStartDate(startOfToday());
      // setCustomEndDate(format(startOfToday(), 'yyyy-MM-dd'));
      setCustomEndDate(startOfToday());
    // }
  };
  const handleCustomStartDateChange = (event) => {
    const startDateString = event.target.value; // Get the input date string
    const startDate = new Date(startDateString); // Convert it to a Date object
    setCustomStartDate(startDate); // Set the state
  };

  const handleCustomEndDateChange = (event) => {
    const endDateString = event.target.value; // Get the input date string
    const endDate = new Date(endDateString); // Convert it to a Date object
    setCustomEndDate(endDate); // Set the state
  };

  function NoOrderFound(){
    return(
      <div>
        <div>No Order Found!</div>
      </div>
    );
  }

  return (
    <div className="space-y-2 mx-2">
      <div className="text-2xl">Orders</div>
      <div className="flex flex-col">
        <div className="flex bg-yellow-200 py-2 space-x-5 px-3">
          <div>Filter</div>
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        {filter === "custom" && (
          <div className="flex flex-col bg-yellow-200 px-3 py-2 space-y-2">
            <div className="flex space-x-3">
              <label htmlFor="start">Start Date:</label>
              <input
                type="date"
                id="start"
                value={format(customStartDate, "yyyy-MM-dd")}
                onChange={handleCustomStartDateChange}
              />
            </div>
            <div>
              <label htmlFor="end">End Date:</label>
              <input
                type="date"
                id="end"
                value={format(customEndDate, "yyyy-MM-dd")}
                onChange={handleCustomEndDateChange}
              />
            </div>
          </div>
        )}
      </div>
      {orders.length === 0 && 
      <NoOrderFound/>
      }

      {orders.map((order, index) => (
        <AdminOrderCard key={index} order={order} />
      ))}

    </div>
  );
}
