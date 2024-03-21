import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { useFirebase } from "../context/FirebaseContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const InquiryForm = () => {
  const { currentUser, db, userMobile } = useFirebase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.displayName);
      setValue("email", currentUser.email);
      setValue("mobile", userMobile);
    }
  }, [currentUser, setValue, userMobile]);

  const addInquiryToFirestore = async (data) => {
    const inquiryData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "Pending", // Set initial status
    };

    addDoc(collection(db, "inquiries"), inquiryData)
      .then((docRef) => {
        console.log("Enquiry placed successfully with ID: ", docRef.id);
        // Navigate to the order success page or show a confirmation message
      })
      .catch((error) => {
        console.error("Error placing enquiry: ", error);
      });
  };

  const onSubmit = (data) => {
    addInquiryToFirestore(data);
    console.log(data);
    reset();
  };

  return (
    <div className="w-full border-t-slate-600 pb-5 pt-10">
      <div className="text-xl font-semibold text-center pt-3">
        Have a Query? Feel Free to Write to Us!
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col px-5 w-full space-y-4 py-4 "
      >
        <div className="">
          <input
            className="w-full px-3 py-2 rounded-md"
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input
            className="w-full px-3 py-2 rounded-md"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            className="w-full px-3 py-2 rounded-md"
            type="tel" // Change the type to "tel" for telephone numbers
            id="mobile"
            placeholder="Mobile"
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^(\+91)?\d{10}$/, // Updated regex for mobile numbers
                message: "Invalid mobile number",
              },
            })}
          />
        </div>

        <div>
          <textarea
            className="w-full px-3 py-2 rounded-md"
            id="message"
            placeholder="Enquiry Message"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button
          className="bg-gradient-to-r from-red-500 to-orange-500
       rounded-full
        py-2 text-xl
         text-white
          drop-shadow-md"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="text-center text-xl py-8">
        Contact us on below contact details
      </div>
      <div className="flex flex-col justify-center text-2xl px-4 space-y-2">
        {/* <div className="flex items-center justify-around">
          <p className="flex space-x-2 items-center justify-start">
            <IoIosCall className="text-blue-600" />
            <span>7909064575</span>
          </p>
          <p className="flex space-x-2 items-center justify-start">
            <FaWhatsapp className="text-green-600" />
            <span>7909064575</span>
          </p>
        </div> */}
        <div className="flex items-center justify-around text-sm">
          <p className="flex space-x-2 items-center justify-start">
            <IoIosCall className="text-blue-600" />
            <FaWhatsapp className="text-green-600" />
            <span> +91 8507420613</span>
          </p>
          {/* <p className="flex space-x-2 items-center justify-start">
            <FaWhatsapp className="text-green-600" />
            <span>8507420613</span>
          </p> */}
        </div>
        <div className="flex space-x-2 items-center justify-center text-sm">
          <CiMail className="text-blue-600 text-md" />
          <div className="text-center ">women's-choice@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
