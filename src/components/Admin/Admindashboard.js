import { useState } from "react";
import EnquiryCard from "../EnquiryCard";
import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { TbShoppingCartCog } from "react-icons/tb";




export default function AdminDashboard({ inquiries }) {
  const [isOrderSelected, setIsOrderSelected] = useState(true);
  const [isAdminMenuClicked, setisAdminMenuClicked] = useState(false);

  function handleAdminMenu() {
    setisAdminMenuClicked(!isAdminMenuClicked);
  }

  function handleEnquirySelect() {
    setIsOrderSelected(false);
  }

  function handleOrderSelect() {
    setIsOrderSelected(true);
  }

  function Enquiry() {
    return (
      <div className=" w-full bg-slate-400 rounded-md px-2 py-2">
        Enquiry
        {inquiries.map((inquiry, index) => (
          <EnquiryCard inquiry={inquiry} />
        ))}
      </div>
    );
  }

  function AdminMenu() {
    return (
      <div className="bg-slate-900/50 w-full h-16 mb-2 rounded-full flex items-center justify-center space-x-10 text-3xl">
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md"><MdDashboard/></div>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md"><FaUserCog/></div>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md"><TbShoppingCartCog/></div>
      </div>
    );
  }

  function Order() {
    return (
      <div className=" w-full bg-slate-400 rounded-md px-2 py-2">Order</div>
    );
  }

  return (
    <div className="pt-20 min-h-screen px-4">
      {isAdminMenuClicked && <AdminMenu />}
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xl">Admin Dashboard</p>
        <div onClick={handleAdminMenu} className="text-3xl px-2 py-2">
          <CiSettings />
        </div>
      </div>

      <div className="relative w-full bg-blue-500 h-16 rounded-md flex space-x-5 justify-around items-center text-xl px-1 py-1 mb-3">
        <div
          onClick={handleEnquirySelect}
          className="w-1/2 flex items-center justify-center"
        >
          Enquiry
        </div>
        <div
          onClick={handleOrderSelect}
          className="w-1/2 flex items-center justify-center"
        >
          Order
        </div>
        <div
          className={`drop-shadow-md border-2 border-yellow-500  absolute h-14 bg-green-500 w-1/2 rounded-md  ${
            isOrderSelected ? "right-1" : "-left-3"
          } top-1  flex items-center justify-center text-white`}
        >
          {isOrderSelected ? "Order" : "Enquiry"}
        </div>
      </div>
      {/* <div>Heelo</div> */}
      {isOrderSelected && <Order />}
      {!isOrderSelected && <Enquiry />}
    </div>
  );
}
