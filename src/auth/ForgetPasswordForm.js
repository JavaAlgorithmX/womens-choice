import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  const auth = getAuth();

  function navigateToLogin(){
    navigate("/login")
  }

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setIsEmailSent(true);
          setSuccessMessage(
            
          );
          setError(null);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error->", errorCode);
          console.log("Error ->", errorMessage);
        });
    } catch (error) {
      setError("Error sending password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    }
    setLoading(true);
  };

  function EmailSent() {
    return (
      <div className="h-screen  flex items-center justify-center px-4 text-center text-green-400 flex-col space-y-5">
        <div className="text-3xl">Password reset email sent</div>
        <div className="text-3xl">Please check your inbox </div>
        <div className="text-3xl">Reset your password and try Login again</div>
        <div className="text-3xl">ThankYou</div>
        <div onClick={navigateToLogin} className="px-5 py-2 bg-blue-500 rounded-md drop-shadow-md w-32 text-white">Login</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {isEmailSent && <EmailSent />}
      {!isEmailSent && (
        <div className="flex items-center justify-center flex-col space-y-4">
          <h2 className="text-2xl text-green-600">Forgot Password</h2>
          <form
            className=" space-y-4 flex items-center justify-center flex-col"
            onSubmit={handleFormSubmit}
          >
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              required
              className="bg-green-100 rounded-md drop-shadow-md w-64 px-5 py-2"
              placeholder="Enter your email"
            />
            <button
              className="bg-green-600 px-4 py-2 rounded-md drop-shadow-md"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          {error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
