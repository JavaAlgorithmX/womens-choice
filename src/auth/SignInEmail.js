// EmailSignIn.js

import React, { useState } from "react";
import {signInWithEmailAndPassword,} from "firebase/auth";
import { Link } from "react-router-dom";
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from "react-router-dom";

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {  auth } = useFirebase();
  const navigate = useNavigate();

  function navigateToHome(){
    navigate("/")
  }

  const handleSignIn = async () => {
    try {
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in user -->", signedInUser);
      setError(null);
      navigateToHome();

      // Sign-in successful, handle redirection or other actions here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full px-8 py-4 flex flex-col items-center justify-center space-y-3">
      <h2 className="text-2xl text-blue-600 font-bold pb-10">
        Sign In With Email
      </h2>
      <input
        className="w-full h-12  rounded-full px-5 bg-slate-100 "
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="w-full h-12  rounded-full px-5 bg-slate-100"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="w-full h-12  rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-xl"
        onClick={
         handleSignIn
        }
      >
        Sign In
      </button>
      {error && <p>{error}</p>}
      <div className="text-blue-700 cursor-pointer">Forget Password?</div>
      <div>
        Don't have an account?{" "}
        <span className="text-blue-700 cursor-pointer"><Link to={"/signup"}>Sign Up</Link></span> here.
      </div>
    </div>
  );
};

export default EmailSignIn;
