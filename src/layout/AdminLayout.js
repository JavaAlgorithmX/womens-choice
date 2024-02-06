import { Outlet } from "react-router-dom";
import AdminMenu from "../components/Admin/AdminNav";

export default function AdminLayout() {
  return (
    <div className="px-4 py-4 min-h-screen">
      <AdminMenu />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
