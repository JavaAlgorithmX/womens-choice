import { useState } from "react";
import {
  MdAddShoppingCart,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Import CartContext



export default function ProductCard({item}) {
  const { addToCart, removeFromCart } = useContext(CartContext); // Access addToCart function from CartContext

  const navigate = useNavigate();
  const image = item.image;
  const name = item.name;
  const discount = item.discount;
  const mrp = item.mrp;
  const boxSize = item.boxSize;
  const boxDiscount = item.boxDiscount;

  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  function handleAddToCart() {
    const cartItem = {
      item: item,
      isBox: isBoxClicked,
      quantity: quantity,
    };
    if(!isAddToCartClicked){
      console.log("CartItem", cartItem);
      addToCart(cartItem);
    }else{
      removeFromCart(cartItem)
    }
    setIsAddToCartClicked(!isAddToCartClicked);
    toast.success("Product added to cart")
  }

  function handleBuyNow(){
    handleAddToCart();
    navigate('/cart')
  }

  function selectPC() {
    setIsBoxClicked(false);
  }

  function selectBox() {
    setIsBoxClicked(true);
  }

  function handleQunatityPlus() {
    setQuantity(quantity + 1);
  }

  function handleQunatityMinus() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <div className=" w-full bg-blue-300 rounded-md drop-shadow-lg">
      <div className="relative">
        <img
          src={isBoxClicked ? "./box.jpg" : image}
          alt=""
          className="rounded-t-md w-full aspect-square"
        ></img>

        <div className="absolute h-20 w-20 rounded-full bg-red-600 flex items-center justify-center text-3xl top-3 left-3 text-white drop-shadow-lg">
          -{isBoxClicked ? discount + boxDiscount : discount}%
        </div>
        <div>
          <img
            src="./logo.jpeg"
            alt=""
            className="rounded-full h-20 w-20 absolute right-5 bottom-5 drop-shadow-md"
          ></img>
        </div>
      </div>

      <div className="px-2 py-1 space-y-2">
        <h2 className="text-2xl font-semibold">{name}</h2>
        {/* price  */}
        <div>
          <div className="flex space-x-5 text-2xl font-bold">
            <div className="text-red-600 ">
              {isBoxClicked ? `${boxDiscount>0?'(':''}${discount}${boxDiscount>0 ? '+':''}${boxDiscount>0 ? boxDiscount : ''} ${boxDiscount>0?')':''}` : discount}% off
            </div>
            <div>
              {" "}
              &#8377;{" "}
              {isBoxClicked
                ? (
                    quantity *
                    (boxSize * (mrp - ((discount + boxDiscount) / 100) * mrp))
                  ).toFixed(2)
                : (quantity * (mrp - (discount / 100) * mrp)).toFixed(2)}
            </div>
          </div>
          <div className="flex space-x-5">
            <div className="text-2xl">
              MRP: &#8377;{" "}
              <span className="line-through">
                {isBoxClicked ? quantity * mrp * boxSize : quantity * mrp}
              </span>
            </div>
            {isBoxClicked && (
              <div className="text-2xl font-semibold text-slate-600">
                ({boxSize} PC/Box)
              </div>
            )}
          </div>
        </div>

        {/* quantity  */}
        <div className="space-y-2">
          {/* toggle between box and pc  */}
          <div className="flex space-x-5 text-2xl bg-slate-400 px-2 py-2 rounded-full relative">
            <div
              className="w-1/2 flex items-center justify-center cursor-pointer"
              onClick={selectBox}
            >
              Box
            </div>
            <div
              className="w-1/2 flex items-center justify-center cursor-pointer"
              onClick={selectPC}
            >
              PC
            </div>

            <div
              className={`w-1/2 h-10 rounded-full ${
                isBoxClicked ? "-left-4" : "right-1"
              }  top-1 border-2 border-orange-500 bg-white absolute flex items-center justify-center text-green-400 font-semibold drop-shadow-md`}
            >
              {isBoxClicked ? "BOX" : "PC"}
            </div>
          </div>
          {/* quantity selector  */}
          <div className=" flex space-x-2 w-full items-center justify-center  px-2  text-3xl">
            <div className="text-3xl cursor-pointer drop-shadow-md bg-blue-400 px-2 py-2 rounded-md">
              <FiMinus onClick={handleQunatityMinus} />
            </div>
            <div className="w-40 flex items-center justify-center">
              {quantity}
            </div>
            <div className="text-3xl  cursor-pointer drop-shadow-md bg-blue-400 px-2 py-2 rounded-md ">
              <GoPlus onClick={handleQunatityPlus} />
            </div>
          </div>

        </div>

        {/* buttons  */}
        <div className="flex flex-col space-y-2 text-xl items-center justify-center py-1">
          <div
            className={`flex items-center justify-center 
            space-x-3 w-full px-5 py-2 ${
              isAddToCartClicked ? "bg-slate-500" : "bg-yellow-400"
            }  rounded-full `}
            onClick={handleAddToCart}
          > {isAddToCartClicked ? <BsCartX/>:
            <MdAddShoppingCart />}
            <span>{isAddToCartClicked ? "Remove" : "Add to Cart"}</span>
          </div>
          {!isAddToCartClicked && (
            <div onClick={handleBuyNow} className="flex items-center justify-center space-x-3 w-full px-5 py-2 bg-yellow-300 rounded-full">
              <MdOutlineShoppingCartCheckout />
              <span>Buy Now</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
