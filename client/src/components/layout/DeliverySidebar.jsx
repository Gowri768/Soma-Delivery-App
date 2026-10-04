import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  X,
} from "lucide-react";

function DeliverySidebar({ open = false, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/delivery/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Delivery History",
      path: "/delivery/history",
      icon: History,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      <div className="p-6 border-b flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-orange-600">
            Village Mart
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Delivery Partner
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default DeliverySidebar;
