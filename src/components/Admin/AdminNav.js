import { MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { TbShoppingCartCog } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";


export default function AdminMenu() {
  return (
    <div
      className="bg-slate-900/50 w-full h-16 mb-2 rounded-full
     flex items-center justify-center space-x-10 text-3xl"
    >
      <Link to={"/admin/dashboard"}>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md">
          <MdDashboard />
        </div>
      </Link>
      <Link to={"/admin/manage-users"}>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md">
          <FaUserCog />
        </div>
      </Link>
      <Link to={"/admin/manage-products"}>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md">
          <TbShoppingCartCog />
        </div>
      </Link>
      <Link to={"/"}>
        <div className="px-2 py-2 bg-slate-400/50 rounded-full drop-shadow-md">
          <IoEarthOutline />
        </div>
      </Link>
    </div>
  );
}
