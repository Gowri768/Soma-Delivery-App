import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h2>

        <p className="text-xs text-gray-500">
          Manage Soma Delivery
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 hover:text-orange-600 transition">
          <Bell size={21} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle
            size={30}
            className="text-gray-500"
          />

          <span className="text-sm font-medium text-gray-700">
            Admin
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminTopbar;