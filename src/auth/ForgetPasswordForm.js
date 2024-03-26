import React, { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

const ForgotPasswordForm = () => {
  const { firebase } = useFirebase();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
      setError(null);
    } catch (error) {
      setError("Error sending password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col space-y-4">
        <h2 className="text-2xl text-green-600">Forgot Password</h2>
        <form className=" space-y-4 flex items-center justify-center flex-col"  onSubmit={handleFormSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            required
            className="bg-green-100 rounded-md drop-shadow-md w-64 px-5 py-2"
            placeholder="Enter your email"
          />
          <button className="bg-green-600 px-4 py-2 rounded-md drop-shadow-md" type="submit">Reset Password</button>
        </form>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
