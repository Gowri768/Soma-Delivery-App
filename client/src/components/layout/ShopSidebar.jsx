import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
} from "lucide-react";

function ShopSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/shop/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Products",
      path: "/shop/my-products",
      icon: Package,
    },
    {
      name: "Add Product",
      path: "/shop/add-product",
      icon: PlusCircle,
    },
    {
      name: "Shop Orders",
      path: "/shop/orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-40">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-600">
          Soma Delivery
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Shop Owner
        </p>
      </div>

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

export default ShopSidebar;