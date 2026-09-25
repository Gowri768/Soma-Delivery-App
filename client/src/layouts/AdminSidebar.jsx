import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  Truck,
  ClipboardList,
} from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Delivery Partners",
      path: "/admin/delivery-partners",
      icon: Truck,
    },
    {
      name: "Delivery Applications",
      path: "/admin/delivery-applications",
      icon: ClipboardList,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-600">
          Soma Delivery
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
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

export default AdminSidebar;