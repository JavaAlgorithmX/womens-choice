import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import ManageProduct from "./components/Admin/ManageProduct";
import ManageUser from "./components/Admin/ManageUser";
import EmailSignIn from "./auth/SignInEmail";
import CreateCustomerForm from "./components/User/CreateCustomer";
import MyOrders from "./components/MyOrders";
import AddProductForm from "./components/Admin/AddProduct";
import { Toaster } from "react-hot-toast";
import CustOrderDetails from "./components/CustomerOrderDetails";
import ScrollToTop from "./components/ScrollToTop";
import OrderPlaced from "./components/OrderPlaced";
import ForgotPasswordForm from "./auth/ForgetPasswordForm";
import AdminOrder from "./components/Admin/AdminOrder";
import AdminEnquiry from "./components/Admin/AdminEnquiry";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<EmailSignIn />} />
          <Route path="/signup" element={<CreateCustomerForm />} />
          <Route path="/forgetPass" element={<ForgotPasswordForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-placed/:orderId" element={<OrderPlaced />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:orderId" element={<CustOrderDetails />} />
        </Route>

        {/* Admin routes  */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/enquiry" element={<AdminEnquiry />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/manage-products" element={<ManageProduct />} />
          <Route path="/admin/product/add-new" element={<AddProductForm isEdit={false} />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
          <Route path="/admin/order/:orderId" element={<CustOrderDetails />} />
          <Route path="/admin/edit-product/:productId"  element={<AddProductForm isEdit={true} />} />
          <Route path="/admin/manage-users/create-user" element={<CreateCustomerForm />}/>
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
