import { useState,useContext } from "react";
import { CartContext } from "../context/CartContext"; // Import CartContext
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
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
import { useFirebase } from "../context/FirebaseContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, auth, userRole } = useFirebase();
  const { cartData } = useContext(CartContext); // Access cartData from CartContext


  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  // Example function that uses Firebase auth
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="fixed h-20  w-full top-0 left-0 z-20">
      {!isMenuOpen && (
        <div className="flex items-center justify-between px-3 py-2 h-20">
          <Link className="text-3xl ml-1" to={"/"}>
            <img src="./logo.jpeg" className="h-16 rounded-md" alt=""></img>
          </Link>
          {/* <div className="bg-red-700 px-3 py-3 rounded-md text-white drop-shadow-lg">
            TESTING V 1.0
          </div> */}
          <div className="flex space-x-3 text-4xl">
            <div>
              <IoMdNotificationsOutline />
            </div>
            <Link to="/cart">
              <div className="relative">
              
                {cartData.length > 0 && (
                  <div className="bg-yellow-500 rounded-full text-lg text-white flex items-center justify-center absolute -top-1 -right-1 h-5 w-5 px-1 py-1">
                   
                    {cartData.length}
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
      <div className="absolute h-screen w-screen bg-gradient-to-b from-cyan-500 to-blue-500 flex flex-col-reverse items-center justify-center text-3xl font-bold z-20">
        {/* //Menu toggle  */}
        <div
          className="absolute top-6 right-6 text-white cursor-pointer "
          onClick={handleMenuClose}
        >
          X
        </div>
        {/* Logo  */}
        <div className="absolute top-2 left-2 text-white cursor-pointer ">
          <img src="./logo.jpeg" className="h-20 rounded-md" alt=""></img>
        </div>

        <div className=" w-80 rounded-md px-2 py-2 space-y-3">
          {currentUser && (
            <div className="w-4/5 mx-auto inset-x-0 bottom-28 text-xl font-semibold border border-slate-300 rounded-md px-2 py-3 text-slate-100 absolute">
              <div className="flex flex-col ">
                <p className="flex space-x-2 items-center justify-center">
                  <LuPhone />
                  <span>{currentUser.email}</span>
                </p>
                <p className="flex space-x-2 items-center justify-center">
                  <LuPhone />
                  <span>{userRole}</span>
                </p>
                <p className="flex space-x-2 items-center justify-center">
                  <LuUser2 />
                  <span>{currentUser.displayName}</span>
                </p>
              </div>
            </div>
          )}
          {currentUser && (
            <div
              onClick={signOut}
              className="absolute inset-x-0 bottom-10 h-16 w-4/5 mx-auto bg-gradient-to-r from-red-500 to-orange-500  rounded-full flex items-center justify-center text-xl text-white"
            >
              Log Out
            </div>
          )}
        </div>

        <nav className="">
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
            {currentUser && (
              <li>
                <Link
                  to="/my-orders"
                  onClick={handleMenuClose}
                  className="space-x-3 flex items-center justify-center"
                >
                  <LuShoppingCart />
                  <span>My Orders</span>
                </Link>
              </li>
            )}
            {currentUser && userRole === "admin" && (
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
            )}
            {!currentUser && (
              <li>
                <Link
                  to="/logIn"
                  onClick={handleMenuClose}
                  className="space-x-3 flex items-center justify-center"
                >
                  <LuLogIn />
                  <span>LogIn</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
