// FirebaseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { app, db } from '../config/firebase'; // Import your Firebase app and Firestore instance
import { getAuth } from 'firebase/auth'; // Import auth from Firebase Authentication
import { onSnapshot, doc } from "firebase/firestore";

// Create a context
const FirebaseContext = createContext();

// Create a Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userMobile, setUserMobile] = useState(null);


  // Initialize auth
  const auth = getAuth(app);

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setCurrentUser(user);
      setLoading(false);

      // If user is logged in, retrieve their role
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeRole = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserRole(doc.data().role);
            setUserMobile(doc.data().mobile);
          } else {
            console.log("No such document!");
          }
        });

        return () => unsubscribeRole();
      } else {
        // If no user is logged in, reset user role
        setUserRole(null);
        setUserMobile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    userMobile,
    userRole,
    currentUser,
    db,
    auth // Include auth in the context value
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);
