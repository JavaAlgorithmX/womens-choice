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

const App = () => {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);
  
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout cart={cart} />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={
              <Products
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/login" element={<EmailSignIn />} />
          <Route path="/signup" element={<CreateCustomerForm />} />

          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Admin routes  */}
        </Route>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard setOrderData={setOrderData} />}
          />
          <Route path="/admin/manage-products" element={<ManageProduct />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
          <Route
            path="/admin/order/:orderId"
            element={<AdminOrderDetails orderData={orderData} />}
          />
          <Route
            path="/admin/edit-product/:productId"
            element={<AddProductForm isEdit={true} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
