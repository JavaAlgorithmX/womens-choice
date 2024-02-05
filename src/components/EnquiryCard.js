import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { CiMobile1 } from "react-icons/ci";




export default function EnquiryCard({inquiry}){
    return(
        <div className="bg-slate-100 rounded-md drop-shadow-md
        px-2 py-2 mb-2 
        ">
           <div className=" flex items-center justify-start space-x-2"><FaRegUser/><span>{inquiry.name}</span></div>
           {/* <div className=" flex items-center justify-start"><CiMobile1/>{inquiry.mobile}</span></div> */}
           <div className=" flex items-center justify-start space-x-2"><CiMail/><span>{inquiry.email}</span></div>
           <div className=" flex items-center justify-start space-x-2"><FaRegMessage/><span>{inquiry.message}</span></div>
        </div>
    );
}