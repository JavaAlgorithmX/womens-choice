import { useState } from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';

import {
  LuAlignJustify,
  LuShoppingCart,
  LuHome,
  LuPackage2,
  LuPhone,
  LuUser2,
} from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function Header({ cart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleMenuClose() {
    setIsMenuOpen(false);
  }
  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  return (
    <div className="fixed h-20  w-full top-0 left-0 z-20">
      {!isMenuOpen && (
        <div className="flex items-center justify-between px-3 py-2 h-20">
          <Link className="text-3xl ml-1"
            to={'/'}
          >
            <img src="./logo.jpeg" className="h-16 rounded-md" alt=""></img>
          </Link>
          <div className="flex space-x-3 text-4xl">
            <div><IoMdNotificationsOutline/></div>
            <Link to="/cart">
              <div className="relative">
                {cart.length > 0 && (
                  <div className="bg-yellow-500 rounded-full text-lg text-white flex items-center justify-center absolute -top-1 -right-1 h-5 w-5 px-1 py-1">
                    {cart.length}
                  </div>
                )}
                <LuShoppingCart />
              </div>
            </Link>
            <div className="mr-2" onClick={handleMenuOpen}>
              <LuAlignJustify />
            </div>
          </div>
        </div>
      )}
      {isMenuOpen && <MobileMenu />}
    </div>
  );

  function MobileMenu() {
    return (
      <div className="absolute h-screen w-screen bg-gradient-to-b from-cyan-500 to-blue-500 flex flex-col-reverse items-center justify-between pb-10 pt-28 text-3xl font-bold z-20">
        <div
          className="absolute top-6 right-6 text-white cursor-pointer "
          onClick={handleMenuClose}
        >
          X
        </div>
        <div className="absolute top-2 left-2 text-white cursor-pointer ">
          <img src="./logo.jpeg" className="h-20 rounded-md" alt=""></img>
        </div>

        <div className=" w-80 rounded-md px-2 py-2 space-y-3">
          {isLoggedIn && (
            <div className="text-xl font-semibold border border-slate-300 rounded-md px-2 py-3 text-slate-100">
              <div className="flex justify-between">
                <p className="flex space-x-2 items-center justify-center">
                  <LuPhone />
                  <span>7909064575</span>
                </p>
                <p className="flex space-x-2 items-center justify-center">
                  <LuUser2 />
                  <span>Admin</span>
                </p>
              </div>
            </div>
          )}
          <div className="h-16 w-full bg-slate-300 rounded-full flex items-center justify-center text-xl">
            {isLoggedIn ? "Log Out" : "Log In"}
          </div>
        </div>

        <nav className=" mt-28">
          <ul className="space-y-3 text-white  flex flex-col items-start">
            <li>
              <Link
                to="/"
                onClick={handleMenuClose}
                className="space-x-3 flex items-center justify-center"
              >
                <LuHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={handleMenuClose}
                className="space-x-3 flex items-center justify-center"
              >
                <LuPackage2 />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={handleMenuClose}
                className="space-x-3 flex items-center justify-center"
              >
                <LuShoppingCart />
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                onClick={handleMenuClose}
                className="space-x-3 flex items-center justify-center"
              >
                <MdOutlineAdminPanelSettings />
                <span>Admin</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
