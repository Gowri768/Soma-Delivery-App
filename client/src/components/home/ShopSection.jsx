import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { Store, ArrowRight } from "lucide-react";

function ShopSection() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        if (!product.shopOwner?._id) return;

        const shopId = product.shopOwner._id;

        if (!shopMap[shopId]) {
          shopMap[shopId] = {
            id: shopId,
            name:
              product.shopOwner.fullName ||
              "Local Shop",
            productCount: 0,
          };
        }

        shopMap[shopId].productCount += 1;
      });

      setShops(Object.values(shopMap));
    } catch (error) {
      console.error("Failed to load shops:", error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            🏪 Local Shops
          </h2>

          <p className="text-gray-600 mt-3">
            Shop from local businesses near you.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              Loading local shops...
            </p>
          </div>
        )}

        {/* No shops */}

        {!loading && shops.length === 0 && (
          <div className="bg-gray-50 rounded-2xl p-10 text-center">
            <Store
              size={45}
              className="mx-auto text-gray-400 mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-700">
              No shops available yet
            </h3>

            <p className="text-gray-500 mt-2">
              Local shops will appear here once they add products.
            </p>
          </div>
        )}

        {/* Shops */}

        {!loading && shops.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {shops.slice(0, 6).map((shop) => (
              <div
                key={shop.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* Shop Header */}

                <div className="bg-orange-50 p-8 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <Store
                      size={38}
                      className="text-orange-500"
                    />
                  </div>
                </div>

                {/* Shop Info */}

                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800">
                    {shop.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {shop.productCount}{" "}
                    {shop.productCount === 1
                      ? "product"
                      : "products"}{" "}
                    available
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/shops/${shop.id}`)
                    }
                    className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                  >
                    View Shop
                    <ArrowRight size={18} />
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default ShopSection;