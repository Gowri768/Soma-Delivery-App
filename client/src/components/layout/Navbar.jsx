import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../../services/cartService";

function Navbar() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
  try {
    const data = await getCartCount();

    console.log("Cart API Response:", data);

    if (data.cart) {
      setCount(data.cart.items.length);
    }
  } catch (error) {
    console.log(error);
  }
};
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

  window.location.reload();
};

  return (
  <nav className="bg-orange-500 text-white shadow-lg sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-3xl font-extrabold tracking-wide"
      >
        🛒 Soma Delivery
      </Link>

      <div className="flex items-center gap-6 font-medium">

        {!user && (
          <>
            <Link to="/" className="hover:text-orange-200">
              Home
            </Link>

            <Link to="/products" className="hover:text-orange-200">
              Products
            </Link>

            <Link to="/about" className="hover:text-orange-200">
              About
            </Link>

            <Link to="/contact" className="hover:text-orange-200">
              Contact
            </Link>

            <Link to="/login" className="hover:text-orange-200">
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100"
            >
              Signup
            </Link>
          </>
        )}

        {user?.role === "customer" && (
          <>
            <Link to="/" className="hover:text-orange-200">
              Home
            </Link>

            <Link to="/products" className="hover:text-orange-200">
              Products
            </Link>

            <Link to="/about" className="hover:text-orange-200">
              About
            </Link>

            <Link to="/contact" className="hover:text-orange-200">
              Contact
            </Link>

            <Link to="/cart" className="hover:text-orange-200">
              Cart ({count})
            </Link>

            <Link to="/my-orders" className="hover:text-orange-200">
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "shopOwner" && (
          <>
            <Link to="/shop/dashboard" className="hover:text-orange-200">
              Dashboard
            </Link>

            <Link to="/shop/my-products" className="hover:text-orange-200">
              My Products
            </Link>

            <Link to="/shop/orders" className="hover:text-orange-200">
              Shop Orders
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>

  </nav>
);
}

export default Navbar;