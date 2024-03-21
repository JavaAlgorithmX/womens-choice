import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import AdminUserCard from "./AdminUserCard";


export default function ManageUser(){
    const { db } = useFirebase();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setUsers(userData);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, [db]);
  
      return (
        <div className="space-y-2 px-2 py-2">
         {users.map((user,index) => (
                <AdminUserCard key={index} user={user}/>
              ))}
        </div>
      );
}