// import 'dotenv/config'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDYLQwRGLgZPXxxn7YxlVIOLTboII5y-Ks",
//   authDomain: "women-s-choice-testing.firebaseapp.com",
//   projectId: "women-s-choice-testing",
//   storageBucket:"women-s-choice-testing.appspot.com" ,
//   messagingSenderId:"549433980328" ,
//   appId: "1:549433980328:web:3b5088d086e9311194999d",
//   measurementId:"G-WGQ4GCPGEH" , // Corrected typo
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID, // Corrected typo
};


const app = initializeApp(firebaseConfig);
// Get a Firestore instance
const db = getFirestore(app);

export { app, db };
