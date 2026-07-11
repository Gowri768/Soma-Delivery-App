import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-orange-700 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        Soma Delivery
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/shop/dashboard"
          className="hover:bg-orange-600 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/shop/my-products"
          className="hover:bg-orange-600 p-2 rounded"
        >
          My Products
        </Link>

        <Link
          to="/shop/add-product"
          className="hover:bg-orange-600 p-2 rounded"
        >
          Add Product
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;