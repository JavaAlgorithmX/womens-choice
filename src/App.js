import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import AdminDashboard from "./components/Admin/Admindashboard";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import ManageProduct from "./components/Admin/ManageProduct";
import ManageUser from "./components/Admin/ManageUser";
import EmailSignIn from "./auth/SignInEmail";
import CreateCustomerForm from "./components/User/CreateCustomer";
import MyOrders from "./components/MyOrders";
import AdminOrderDetails from "./components/Admin/AdminOrderDetails";
import AddProductForm from "./components/Admin/AddProduct";
import { Toaster } from "react-hot-toast";
import CustOrderDetails from "./components/CustomerOrderDetails";
import ScrollToTop from "./components/ScrollToTop";
import OrderPlaced from "./components/OrderPlaced";
import ForgotPasswordForm from "./auth/ForgetPasswordForm";

const App = () => {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);

  // const addToCart = (newItem) => {
  //   // const existingItemIndex = cart.findIndex((item) => item.item.id === newItem.item.id);
  //   const existingItemIndex = cart.findIndex((item) => {
  //     // Check if the item ID and box type are the same
  //     return item.item.id === newItem.item.id && item.isBox === newItem.isBox;
  //   });
  //   // console.log("existingItemIndex  ", existingItemIndex);
  //   if (existingItemIndex !== -1) {
  //     // If the item already exists in the cart
  //     const existingItem = cart[existingItemIndex];
  //     // Check if the box type is the same
  //     if (existingItem.isBox === newItem.isBox) {
  //       // If the box type is the same, update its quantity
  //       const updatedCart = cart.map((item, index) => {
  //         if (index === existingItemIndex) {
  //           return {
  //             ...item,
  //             quantity: item.quantity + newItem.quantity,
  //           };
  //         }
  //         return item;
  //       });
  //       setCart(updatedCart);
  //     } else {
  //       setCart([...cart, newItem]);
  //     }
  //   } else {
  //     setCart([...cart, newItem]);
  //   }
  // };

  // const removeFromCart = (item) => {
  //   setCart(cart.filter((i) => i.item.id !== item.item.id));
  // };

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <Products 
             
               />
            }
          />
          <Route path="/login" element={<EmailSignIn />} />
          <Route path="/signup" element={<CreateCustomerForm />} />
          <Route path="/forgetPass" element={<ForgotPasswordForm/>}/>

          <Route
            path="/cart"
            element={<Cart 
           
            />}
          />
          <Route
            path="/order-placed/:orderId"
            element={
              <OrderPlaced/>
            }
          />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:orderId" element={<CustOrderDetails />} />


          {/* Admin routes  */}
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard setOrderData={setOrderData} />}
          />
          <Route path="/admin/manage-products" element={<ManageProduct />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
          <Route path="/admin/order/:orderId" element={<CustOrderDetails />} />
          <Route
            path="/admin/edit-product/:productId"
            element={<AddProductForm isEdit={true} />}
          />
          <Route
            path="/admin/manage-users/create-user"
            element={<CreateCustomerForm />}
          />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={6}
        containerStyle={{ margin: "5px" }}
        toastOptions={{
          success: {
            duration: 4000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "12px",
            maxWidth: "400px",
            padding: "10px 20px",
            backgroundColor: "light-green",
          },
        }}
      />
    </Router>
  );
};

export default App;
