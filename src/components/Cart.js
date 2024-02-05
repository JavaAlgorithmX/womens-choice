import React from "react";
import { MdDelete } from "react-icons/md";

const Cart = ({ cart, removeFromCart }) => {
  // Function to calculate total MRP
  const calculateTotalMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemMRP = cartItem.isBox
          ? cartItem.quantity * cartItem.item.mrp * cartItem.item.boxSize
          : cartItem.quantity * cartItem.item.mrp;
        return total + itemMRP;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalDiscountOnMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemDiscount = !cartItem.isBox ? cartItem.quantity*(cartItem.item.mrp * cartItem.item.discount /100 )
                                             : cartItem.item.boxSize * cartItem.quantity*(cartItem.item.mrp * cartItem.item.discount /100 )
        return total + itemDiscount;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalBoxDiscountOnMRP = () => {
    return cart
      .reduce((total, cartItem) => {
        const itemDiscount = cartItem.isBox ? 
         cartItem.quantity*cartItem.item.boxSize*cartItem.item.mrp * cartItem.item.boxDiscount /100 :
         0
        return total + itemDiscount;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalPayableAmount = () => {
    return calculateTotalMRP()-calculateTotalDiscountOnMRP()-calculateTotalBoxDiscountOnMRP()
  };

  

  function OrderCard({ orderItem }) {
    return (
      <div className="bg-yellow-300 px-2 py-2 rounded-md flex space-x-2">
        <div>
          <img src={orderItem.item.image} alt="" className="h-28 w-28" />
        </div>
        <div>
          <h2>{orderItem.item.name}</h2>
          <div className="text-2xl" onClick={() => removeFromCart(orderItem)}>
            <MdDelete />
          </div>
        </div>
      </div>
    );
  }
  function OrderTotal({ cart }) {
    return (
      <div className="bg-slate-400 rounded-md px-2 py-2">
        <h2 className="py-2">PRICE DETAILS ({cart.length} Items)</h2>
        <hr />
        <div className="py-2">
          <div className="flex items-center justify-between">
            <div>Total MRP</div>
            <div>{calculateTotalMRP()}</div>
          </div>
          <div  className="flex items-center justify-between">
            <div>discount on MRP</div>
            <div>{calculateTotalDiscountOnMRP()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Box Discount</div>
            <div>{calculateTotalBoxDiscountOnMRP()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Shipping Fee</div>
            <div>FREE</div>
          </div>
        </div>
        <hr />
        <div className="py-2 flex items-center justify-between">
          <div>Total Amount</div>
          <div>{calculateTotalPayableAmount()}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-2 pt-20 px-4">
      <h2 className="text-2xl font-semibold text-slate-600">CHECKOUT</h2>

      {/* order  */}
      <div className="bg-slate-400 px-2 py-2 space-y-2 rounded-md">
        <h2>My Order</h2>
        {cart.map((item) => (
          <OrderCard orderItem={item} />
        ))}
      </div>
      <div className="bg-green-500 rounded-md px-2 py-2">you are saving {calculateTotalMRP()-calculateTotalPayableAmount()} on this Order</div>
      {cart.length > 0 && <OrderTotal cart={cart} />}
      <div className="w-full px-3 py-3 bg-blue-600 rounded-md flex items-center justify-center text-2xl text-white">
        Place Order
      </div>

      <div className="w-full px-3 py-3 bg-blue-600 rounded-md flex items-center justify-center text-2xl text-white">
        Add More Products
      </div>
    </div>
  );
};

export default Cart;
