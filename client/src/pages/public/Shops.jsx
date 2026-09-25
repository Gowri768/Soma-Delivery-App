import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import BackButton from "../../components/common/BackButton";
import {
  Store,
  Mail,
  Package,
  Search,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

function Shops() {
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      const products = data.products || [];

      // Group products by shop owner
      const shopMap = {};

      products.forEach((product) => {
        const owner = product.shopOwner;

        if (!owner?._id) return;

        if (!shopMap[owner._id]) {
          shopMap[owner._id] = {
            _id: owner._id,
            fullName: owner.fullName,
            email: owner.email,
            products: [],
          };
        }

        shopMap[owner._id].products.push(product);
      });

      setShops(Object.values(shopMap));
    } catch (error) {
      console.error("Failed to fetch shops:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShops = shops.filter((shop) => {
    const searchText = search.toLowerCase();

    return (
      shop.fullName?.toLowerCase().includes(searchText) ||
      shop.email?.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading shops...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <BackButton />

          <div className="flex items-center gap-4">

            <div className="bg-orange-100 p-4 rounded-2xl">
              <Store
                size={35}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Explore Shops
              </h1>

              <p className="text-gray-500 mt-2">
                Discover products from our local shop owners.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

          <div className="relative max-w-xl">

            <Search
              size={21}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search shops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Shop Count */}
        <div className="mb-6">
          <p className="text-gray-500">
            {filteredShops.length}{" "}
            {filteredShops.length === 1
              ? "shop"
              : "shops"}{" "}
            found
          </p>
        </div>

        {/* ================= NO SHOPS ================= */}
        {filteredShops.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">

            <div className="flex justify-center mb-5">
              <div className="bg-orange-100 p-5 rounded-full">
                <ShoppingBag
                  size={45}
                  className="text-orange-500"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No Shops Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for a different shop.
            </p>

          </div>

        ) : (

          /* ================= SHOP CARDS ================= */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredShops.map((shop) => (

              <div
                key={shop._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"
              >

                {/* Shop Header */}
                <div className="flex items-center gap-4 mb-6">

                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Store
                      size={30}
                      className="text-orange-500"
                    />
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-xl font-bold text-gray-800 truncate">
                      {shop.fullName || "Shop Owner"}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Local Shop
                    </p>

                  </div>

                </div>

                {/* Shop Email */}
                <div className="flex items-center gap-3 text-gray-600 mb-4">

                  <Mail
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-sm truncate">
                    {shop.email || "Email not available"}
                  </span>

                </div>

                {/* Product Count */}
                <div className="flex items-center gap-3 text-gray-600 mb-6">

                  <Package
                    size={18}
                    className="text-orange-500"
                  />

                  <span className="text-sm">
                    {shop.products.length}{" "}
                    {shop.products.length === 1
                      ? "product"
                      : "products"}
                  </span>

                </div>

                {/* ================= PRODUCTS PREVIEW ================= */}

                <div className="border-t pt-5">

                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Available Products
                  </p>

                  <div className="space-y-2">

                    {shop.products
                      .slice(0, 3)
                      .map((product) => (

                        <div
                          key={product._id}
                          className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                        >

                          <span className="text-sm text-gray-700 truncate mr-3">
                            {product.name}
                          </span>

                          <span className="text-sm font-semibold text-orange-600">
                            ₹{product.price}
                          </span>

                        </div>

                      ))}

                  </div>

                  {shop.products.length > 3 && (
                    <p className="text-xs text-gray-400 mt-3">
                      +{shop.products.length - 3} more products
                    </p>
                  )}

                </div>

                {/* ================= VIEW SHOP ================= */}

                <button
                  onClick={() =>
                    navigate(`/shops/${shop._id}`)
                  }
                  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  View Shop
                  <ArrowRight size={18} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Shops;