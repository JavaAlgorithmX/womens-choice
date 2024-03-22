import { useParams } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



export default function OrderPlaced(){
    const { orderId } = useParams(); // Get orderId from URL params
    const navigate = useNavigate();

    function navigateToMyOrders(){
        navigate("/my-orders")
    }

    return(
        <div className="h-screen w-full flex items-center flex-col justify-center space-y-2">
            <div className="text-8xl text-green-600"><BsCartCheck/></div>
            <div className="text-xl flex justify-center items-center space-x-2"><span className="">Order placed successfully </span><AiFillLike className="text-green-600"/></div>
            <div className="text-sm">Order Id {orderId}</div>
            <div onClick={navigateToMyOrders} className="px-4 py-2 bg-green-300 rounded-md drop-shadow-md text-green-800">View Orders</div>
        </div>
    );
}