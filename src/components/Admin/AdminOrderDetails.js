import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utility";
export default function AdminOrderDetails({ orderData }) {
  const { orderId } = useParams();
  //   const order = orderData.find((order) => order.id === orderId);

//   {
//     "id": "D9uPG16AaO2ZW6bIql4p",
//     "userId": "MftQYgPHEwQjaYtnkoG14DkFT2q1",
//     "userName": "Madhav Madhukar",
//     "products": [
//         {
//             "isBox": false,
//             "boxDiscount": 10,
//             "quantity": 1,
//             "discount": 30,
//             "productId": 1
//         }
//     ],
//     "status": "pending",
//     "userMobile": "07909064575",
//     "createdAt": {
//         "seconds": 1708012963,
//         "nanoseconds": 969000000
//     },
//     "totalAmount": 70
// }

  return (
    <div>
        <div>Order Details</div>
        <div>User ID: {orderId}</div>
        <div>Order By: {orderData.userName}</div>
        <div>Contact: {orderData.userMobile}</div>
        <div>Contact: {formatDate(orderData.createdAt)}</div>
        
        <div>Status: {orderData.status}</div>
        <div>Total Payable amount:  {orderData.totalAmount}</div>
       
      
    </div>
  );
}
