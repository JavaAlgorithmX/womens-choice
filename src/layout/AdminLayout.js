import { Outlet } from "react-router-dom";
import AdminMenu from "../components/Admin/AdminNav";
import Footer from "../components/footer";

export default function AdminLayout() {
  return (
    <div className="px-1 py-4 min-h-screen">
      <AdminMenu />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
