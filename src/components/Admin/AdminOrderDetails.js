
export default function AdminOrderDetails({orderData}){
    return (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {orderData.id}</p>
          {/* Display other order details */}
        </div>
      );
}