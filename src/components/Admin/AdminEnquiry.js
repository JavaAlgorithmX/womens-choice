import { useState, useEffect } from "react";
import EnquiryCard from "../EnquiryCard";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";

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

export default function AdminEnquiry({setOrderData}) {
  const [enquiries, setEnquiries] = useState([]);
  const { db } = useFirebase();

  useEffect(() => {
    const fetchEnquiriesData = async () => {
      const enquiriesData = await fetchEnquiries(db);
      setEnquiries(enquiriesData);
    };
    fetchEnquiriesData();
  }, [db]);

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
 
  return (
    <div className="mx-2">
      <div className="flex items-center justify-between mb-2 px-2 ">
        <p className="text-2xl">Enquiry</p>
      </div>
      <Enquiry />
    </div>
  );
}
