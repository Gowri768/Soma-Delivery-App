import { Menu, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DeliveryTopbar({ onMenuClick }) {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
            Delivery Partner Panel
          </h2>
          <p className="hidden sm:block text-xs text-gray-500">
            Manage your deliveries
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:flex items-center gap-2">
          <UserCircle size={28} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 max-w-[140px] truncate">
            {user?.fullName || "Partner"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default DeliveryTopbar;
