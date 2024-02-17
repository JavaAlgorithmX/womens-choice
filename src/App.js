import React, { useState } from "react";
// import { Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const [cart, setCart] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const items = [
    {
      id: 1,
      name: `Women's Choice Dry Regular(7)`,
      boxSize: 120,
      boxDiscount: 10,
      // mrp: 29,
      mrp: 100,
      discount: 30,
      image: "./product1.png",
    },
    {
      id: 2,
      name: `Women's Choice Dry XL(7)`,
      boxSize: 108,
      boxDiscount: 2,
      mrp: 39,
      discount: 20,
      image: "./product2.png",
    },
    {
      id: 3,
      name: `Women's Choice Dry Regular(20)`,
      boxSize: 40,
      boxDiscount: 2,
      mrp: 79,
      discount: 40,
      image: "./product3.png",
    },
    {
      id: 4,
      name: `Women's Choice Dry XL(18)`,
      boxSize: 40,
      boxDiscount: 2,
      mrp: 99,
      discount: 10,
      image:
        "https://m.media-amazon.com/images/I/61xtTaATvKL._SX679_PIbundle-16,TopRight,0,0_AA679SH20_.jpg",
    },
    {
      id: 5,
      name: `Women's Choice Dry XL(40)`,
      boxSize: 20,
      boxDiscount: 2,
      mrp: 199,
      discount: 5,
      image:
        "https://m.media-amazon.com/images/I/61xtTaATvKL._SX679_PIbundle-16,TopRight,0,0_AA679SH20_.jpg",
    },
  ];

  const handleInquirySubmit = (data) => {
    setInquiries([...inquiries, data]);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  return (
    
    <Router>
          <Routes>
            <Route element={<AppLayout cart={cart}/>}>
            <Route
              path="/"
              element={<Home onInquirySubmit={handleInquirySubmit} />}
            />
            <Route
              path="/products"
              element={
                <Products
                  items={items}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route path="/login" element={<EmailSignIn/>}/>
            <Route path="/signup" element={<CreateCustomerForm/>}/>
           
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route
              path="/my-orders"
              element={<MyOrders/>}
            />

            {/* Admin routes  */}
            </Route>
             <Route  element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard  setOrderData={setOrderData}/>} />
              <Route path="/admin/manage-products" element={<ManageProduct/>}/>
              <Route path="/admin/manage-users" element={<ManageUser/>}/>
              <Route path="/admin/order/:orderId" element={<AdminOrderDetails orderData={orderData}/>}  />
              <Route path="/admin/edit-product/:productId" element={<AddProductForm isEdit={true}/>}  />
            </Route>
          </Routes>
    </Router>
  );
};

export default App;
