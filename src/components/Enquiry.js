import React from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";




const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="w-full">
        <div>
            <p>Have Enquiry, Write US.</p>
        </div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col px-5 w-full space-y-4 py-4 border border-t-slate-600 mt-5"
    >
      <div className="">
        {/* <label htmlFor="name">Name:</label> */}
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
        {/* <label htmlFor="email">Email:</label> */}
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
        {/* <label htmlFor="message">Message:</label> */}
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
    <div className="text-center text-xl pb-4">Or Contact us on below contact details</div>
    <div className="flex justify-around text-2xl">
        <p className="flex space-x-2 items-center justify-start"><IoIosCall className="text-blue-600"/><span>7909064575</span></p>
        <p className="flex space-x-2 items-center justify-start"><FaWhatsapp className="text-green-600"/><span>7909064575</span></p>
    </div>
    </div>
  );
};

export default InquiryForm;
