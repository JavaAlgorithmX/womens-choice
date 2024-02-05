import React from "react";
import { useNavigate } from "react-router-dom";
import InquiryForm from "./Enquiry";
import { IoIosArrowDropdown } from "react-icons/io";
import Carousel from "./ProductCarousel";

const Home = ({ onInquirySubmit }) => {
  const navigate = useNavigate();
  function handleProcuctClick() {
    navigate("/products");
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 ">
        <img
          src="./landing.jpg"
          alt=""
          className="h-screen mix-blend-overlay"
        ></img>
      </div>

      <div className="absolute top-0 left-0  h-screen w-full flex items-center justify-center px-3 flex-col">
        <div className="text-4xl font-semibold font-serif text-white text-center">
          Welcome to Indian <br />
          <span className="text-blue-700">Women's Choice</span>
          <br />
          <span className="text-green-300 font-normal">Hygiene With Care!</span>
          <br />
        </div>

        <div className="font-semibold text-4xl font-serif text-white mt-10 ">
          Odering App
        </div>

        <button
          className="
          animate-bounce
          mt-44
           w-3/5 
             px-2 py-2
               rounded-full
                border-2
                 border-gray-500
                  flex
                   space-x-4
                   items-center
                    justify-center
                     text-2xl  "
        >
          <span>Scroll Down</span> <IoIosArrowDropdown className="text-4xl" />
        </button>
      </div>

      <div className=" flex items-center justify-center flex-col space-y-2 bg-gradient-to-r from-teal-200 to-teal-500 pb-5">
        <Carousel />
        <p className="text-2xl text-white py-2">
          Click Here to See our Products
        </p>
        <button
          onClick={handleProcuctClick}
          className="px-10 py-3 drop-shadow-md bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full text-xl text-white"
        >
          Products
        </button>
        <InquiryForm onInquirySubmit={onInquirySubmit} />
      </div>
    </div>
  );
};

export default Home;
