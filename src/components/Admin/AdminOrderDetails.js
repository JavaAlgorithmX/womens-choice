import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utility";
import { useFirebase } from "../../context/FirebaseContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
export default function AdminOrderDetails() {

  const { orderId } = useParams();
  const { db } = useFirebase();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(orderId);
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orderDoc = await getDoc(doc(db, "orders", orderId)); // Fetch order details using orderId
        if (orderDoc.exists()) {
          console.log("order-data ", orderDoc.data());
          setOrder(orderDoc.data());
          // Fetch products based on product IDs
          const productsData = await Promise.all(
            orderDoc.data().products.map(async (product) => {
              const productDoc = await getDoc(
                doc(db, "products", product.productId)
              );
              console.log("productDoc -> ", productDoc.data());
              return productDoc.exists() ? productDoc.data() : null;
            })
          );
          setProducts(productsData);
        } else {
          console.log("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      console.log("order id Found");
      fetchOrderDetails();
    }else{
      console.log("No order id");
    }
  }, [db, orderId]);

    // Method to calculate total MRP
    const calculateTotalMRP = (order, products) => {
      let totalMRP = 0;
  
      order.products.forEach((orderProduct, index) => {
        const productData = products[index];
  
        const itemMRP = orderProduct.isBox
          ? orderProduct.quantity * productData.boxSize * productData.mrp
          : orderProduct.quantity * productData.mrp;
        totalMRP += itemMRP;
      });
  
      return totalMRP.toFixed(2);
    };
  
    // Method to calculate total discount on MRP
    const calculateTotalDiscountOnMRP = (order, products) => {
      let totalDiscountOnMRP = 0;
  
      order.products.forEach((orderProduct, index) => {
        const productData = products[index];
  
        const itemDiscount =
          orderProduct.quantity * productData.mrp * (productData.discount / 100);
        totalDiscountOnMRP += itemDiscount;
      });
  
      return totalDiscountOnMRP.toFixed(2);
    };
  
    // Method to calculate total box discount on MRP
    const calculateTotalBoxDiscountOnMRP = (order, products) => {
      let totalBoxDiscountOnMRP = 0;
  
      order.products.forEach((orderProduct, index) => {
        const productData = products[index];
  
        const itemBoxDiscount = orderProduct.isBox
          ? (orderProduct.quantity * productData.mrp * productData.boxDiscount) /
            100
          : 0;
        totalBoxDiscountOnMRP += itemBoxDiscount;
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

  return (
    <div className="pt-20 px-4 space-y-2">
      <h2  className="text-3xl">
        Order Details
      </h2>
      <div className="text-xl">Order ID: {orderId}</div>
      {/* <div>Order At : {formatDate(order.createdAt)}</div> */}
      {/* <div>Order status : {order.status}</div> */}
      {/* <h3 className="text-xl">Products</h3> */}
      <div className="space-y-2">
        {products.map((product, index) => (
          <OrderCard key={index} orderItem={product} index={index} />
        ))}
      </div>
      <OrderTotal />
    </div>
  );
}
