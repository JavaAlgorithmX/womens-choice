import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function AdminUserCard({user}){
    return(
        <div className="relative grid grid-cols-3 gap-3 bg-slate-200 rounded-md drop-shadow-md">
            <div className="col-span-1 px-2 py-2 rounded-md">
                <img className="aspect-square h-20 rounded-full drop-shadow-md" src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt=""></img>
            </div>
            <div className="col-span-2 py-2">
            <div>{user.shopName}</div>
                <div>{user.mobile}</div> 
                <div>{user.role}</div>
            </div>
            <div className=" absolute top-2 right-2 space-y-2 flex flex-col items-center justify-center">
                <div className="text-red-600 text-3xl"><MdDeleteForever/></div>
                {/* <div className="text-2xl text-blue-600"><FaEdit/></div> */}
            </div>
        </div>
    );
}