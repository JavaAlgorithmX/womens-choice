import { formatDate } from "../../utils/utility";
import { useNavigate } from "react-router-dom";

export default function AdminOrderCard({ order, setOrderData }) {
  const navigate = useNavigate();

  function showOrderDetails() {
    navigate(`/admin/order/${order.id}`);
  }

  return (
    <div
      onClick={showOrderDetails}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-2 rounded-md"
    >
      <div className="text-slate-50">
        Order Date :{" "}
        <span className="text-slate-200 px-2">
          {formatDate(order.createdAt)}
        </span>
      </div>
      <div className="text-slate-50">
        Status : <span className="text-slate-200 px-2">{order.status}</span>
      </div>
      <div className="text-slate-50">
        Order Amount :{" "}&#8377; 
        <span className="text-slate-200 px-2">{order.totalAmount}</span>{" "}
      </div>
      <div className="text-slate-50">
        Order By : <span className="text-slate-200 px-2">{order.userName}</span>{" "}
      </div>
      <div className="text-slate-50">
        Contact :{" "}
        <span className="text-slate-200 px-2">{order.userMobile}</span>{" "}
      </div>
    </div>
  );
}
