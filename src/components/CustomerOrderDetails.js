import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../context/FirebaseContext";
import { formatDate } from "../utils/utility";
import toast from "react-hot-toast";

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Get orderId from URL params
  const { db } = useFirebase();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [isAdminOrderPage, setIsAdminOrderPage] = useState(false);
  const [customer, setCustomer] = useState(null); // State to store customer details

  function printProduct() {
    console.log("Products", products);
    console.log("Order", order);
    console.log(order.products[1].isBox);
  }

  function CustomerDetailsCard() {
    if (customer !== null) {
      return (
        <div className="bg-yellow-200 p-2 rounded-md drop-shadow-md">
          <div>Shop Name: {customer.shopName}</div>
          <div>Mobile: {customer.mobile}</div>
          <div>
            Address:
            <br /> {customer.shopAddressLine1},{customer.shopAddressLine2},
            Landmark: {customer.landmark},
            <br />
            {customer.state} ,{customer.country} , PIN: {customer.pin}
            <br />
          </div>
        </div>
      );
    } else {
      <div>Error loading </div>;
    }
  }

  function OrderCard({ orderItem, index }) {
    return (
      <div className="relative bg-slate-300 px-2 py-2 rounded-md flex space-x-2">
        <div>
          <img src={orderItem.image} alt="" className="h-28 w-28" />
        </div>
        <div>
          <h2 className="text-md">{orderItem.name}</h2>
          <h1>
            MRP:{" "}
            {order.products[index].isBox
              ? orderItem.boxSize *
                orderItem.mrp *
                order.products[index].quantity
              : orderItem.mrp * order.products[index].quantity}
          </h1>
          <h1>Type: {orderItem.isBox ? "Box" : "Pc"}</h1>

          <h1>Quantity: {order.products[index].quantity}</h1>
        </div>
      </div>
    );
  }
  useEffect(() => {
    // Check if the current URL path contains '/admin/order/'
    setIsAdminOrderPage(window.location.pathname.includes("/admin/order/"));
  }, [isAdminOrderPage]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orderDoc = await getDoc(doc(db, "orders", orderId)); // Fetch order details using orderId
        if (orderDoc.exists()) {
        //  console.log("order-data ", orderDoc.data());
          setOrder(orderDoc.data());

          // Fetch products based on product IDs
          const productsData = await Promise.all(
            orderDoc.data().products.map(async (product) => {
              const productDoc = await getDoc(
                doc(db, "products", product.productId)
              );
             // console.log("productDoc -> ", productDoc.data());
              return productDoc.exists() ? productDoc.data() : null;
            })
          );

          setProducts(productsData);
          // Fetch customer details using user ID from the order
          if (isAdminOrderPage) {
            const customerDoc = await getDoc(
              doc(db, "users", orderDoc.data().userId)
            );
            if (customerDoc.exists()) {
              setCustomer(customerDoc.data());
            //  console.log("Customer Data ->", customerDoc);
            } else {
              console.log("Customer not found");
            }
          }
        } else {
          console.log("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
       // console.log("finally ");
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [db, orderId, isAdminOrderPage]);

  // Method to calculate total MRP
  const calculateTotalMRP = (order, products) => {
    if (order === null) {
      return 0;
    }

    let totalMRP = 0;

    order.products.forEach((orderProduct, index) => {
      const productData = products[index];

      if (productData) {
        const itemMRP = orderProduct.isBox
          ? orderProduct.quantity * productData.boxSize * productData.mrp
          : orderProduct.quantity * productData.mrp;
        totalMRP += itemMRP;
      }
    });

    return totalMRP.toFixed(2);
  };

  // Method to calculate total discount on MRP
  const calculateTotalDiscountOnMRP = (order, products) => {
    let totalDiscountOnMRP = 0;

    order.products.forEach((orderProduct, index) => {
      const productData = products[index];

      if (productData) {
        const itemDiscount =
          orderProduct.quantity *
          productData.mrp *
          (productData.discount / 100);
        totalDiscountOnMRP += itemDiscount;
      }
    });

    return totalDiscountOnMRP.toFixed(2);
  };

  // Method to calculate total box discount on MRP
  const calculateTotalBoxDiscountOnMRP = (order, products) => {
    let totalBoxDiscountOnMRP = 0;

    order.products.forEach((orderProduct, index) => {
      const productData = products[index];

      if (productData) {
        const itemBoxDiscount = orderProduct.isBox
          ? (orderProduct.quantity *
              productData.mrp *
              productData.boxDiscount) /
            100
          : 0;
        totalBoxDiscountOnMRP += itemBoxDiscount;
      }
    });

    return totalBoxDiscountOnMRP.toFixed(2);
  };

  // Method to calculate total payable amount
  const calculateTotalPayableAmount = (order, products) => {
    const totalMRP = calculateTotalMRP(order, products);
    const totalDiscountOnMRP = calculateTotalDiscountOnMRP(order, products);
    const totalBoxDiscountOnMRP = calculateTotalBoxDiscountOnMRP(
      order,
      products
    );

    return (totalMRP - totalDiscountOnMRP - totalBoxDiscountOnMRP).toFixed(2);
  };

  function OrderTotal() {
    return (
      <div className="bg-slate-400 rounded-md px-2 py-2">
        <h2 className="py-2">PRICE DETAILS ({products.length} Items)</h2>
        <hr />
        <div className="py-2">
          <div className="flex items-center justify-between">
            <div>Total MRP</div>
            <div>{calculateTotalMRP(order, products)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>discount on MRP</div>
            <div>{calculateTotalDiscountOnMRP(order, products)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Box Discount</div>
            <div>{calculateTotalBoxDiscountOnMRP(order, products)}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Shipping Fee</div>
            <div>FREE</div>
          </div>
        </div>
        <hr />
        <div className="py-2 flex items-center justify-between">
          <div>Total Amount</div>
          <div>{calculateTotalPayableAmount(order, products)}</div>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    try {
      // Update the status field in Firestore
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      console.log("Order status updated successfully!");
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className={`${isAdminOrderPage ? "" : "pt-20"} px-4 space-y-2 mb-20`}>
      <h2 onClick={printProduct} className="text-3xl">
        Order Details
      </h2>
      <div className="text-xl">Order ID: {orderId}</div>
      <div>Order At : {formatDate(order.createdAt)}</div>
      {!isAdminOrderPage && <div>Order status : {order.status}</div>}
      {isAdminOrderPage && (
        <div>
          Order status :
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
      {/* <h1>isAdmin: {`${isAdminOrderPage?"yes":"NO"}`}</h1> */}
      {isAdminOrderPage && (
        <>
          <h1 className="text-xl">Customer Details</h1>
          <CustomerDetailsCard />
        </>
      )}
      <h3 className="text-xl">Products</h3>
      <div className="space-y-2">
        {products.map((product, index) => (
          <OrderCard key={index} orderItem={product} index={index} />
        ))}
      </div>
      <OrderTotal />
    </div>
  );
};

export default OrderDetailPage;
