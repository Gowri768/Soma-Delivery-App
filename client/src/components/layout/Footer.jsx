import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-orange-400">
            🛒 Soma Delivery
          </h2>

          <p className="mt-4 text-gray-300">
            Fresh groceries delivered to your doorstep with
            speed, quality, and convenience.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="space-y-2">
            <Link to="/" className="block hover:text-orange-400">
              Home
            </Link>

            <Link to="/products" className="block hover:text-orange-400">
              Products
            </Link>

            <Link to="/about" className="block hover:text-orange-400">
              About
            </Link>

            <Link to="/contact" className="block hover:text-orange-400">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-3">

            <p className="flex items-center gap-2">
              <Phone size={18} />
              +91 98765 43210
            </p>

            <p className="flex items-center gap-2">
              <Mail size={18} />
              support@somadelivery.com
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={18} />
              Andhra Pradesh, India
            </p>

          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        © 2026 Soma Delivery. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;