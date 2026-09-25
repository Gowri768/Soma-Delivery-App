import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  History,
} from "lucide-react";

function DeliverySidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/delivery/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Deliveries",
      path: "/delivery/dashboard",
      icon: Truck,
    },
    {
      name: "Delivery History",
      path: "/delivery/history",
      icon: History,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-40">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-600">
          Soma Delivery
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Delivery Partner
        </p>
      </div>

      <nav className="p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
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