import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Store,
  Search,
  ArrowLeft,
  ShoppingCart,
  Package,
} from "lucide-react";

import { getProducts } from "../../services/productService";
import { addToCart } from "../../services/cartService";

function ShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopProducts();
  }, [shopId]);

  const fetchShopProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      const allProducts = data.products || [];

      // Get products belonging only to this shop
      const shopProducts = allProducts.filter(
        (product) =>
          product.shopOwner?._id === shopId
      );

      setProducts(shopProducts);

      // Get shop information from first product
      if (shopProducts.length > 0) {
        const owner = shopProducts[0].shopOwner;

        setShop({
          _id: owner._id,
          fullName: owner.fullName,
          email: owner.email,
        });
      }
    } catch (error) {
      console.error("Failed to load shop:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Failed to add product to cart";

      alert(message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading shop...
        </p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <Store
          size={60}
          className="text-orange-500 mb-4"
        />

        <h2 className="text-2xl font-bold text-gray-800">
          Shop Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          This shop does not have any available products.
        </p>

        <button
          onClick={() => navigate("/shops")}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Back to Shops
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <button
            onClick={() => navigate("/shops")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition"
          >
            <ArrowLeft size={18} />
            Back to Shops
          </button>

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Store
                size={40}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {shop.fullName}
              </h1>

              <p className="text-gray-500 mt-1">
                Local Shop
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {shop.email}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Shop Stats */}

        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <Package size={18} className="text-orange-500" />

          <span>
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}{" "}
            available
          </span>
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

          <div className="relative max-w-xl">

            <Search
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder={`Search products in ${shop.fullName}...`}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">

            <Package
              size={50}
              className="text-gray-300 mx-auto mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for another product.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                {/* Product Image */}

                <div className="h-52 bg-gray-100 flex items-center justify-center">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <Package
                      size={60}
                      className="text-gray-300"
                    />
                  )}

                </div>

                {/* Product Details */}

                <div className="p-5">

                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
                    {product.description ||
                      "Fresh and quality product available from this local shop."}
                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-xl font-bold text-orange-600">
                      ₹{product.price}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        product.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} left`
                        : "Out of stock"}
                    </span>

                  </div>

                  {/* Add To Cart */}

                  <button
                    disabled={product.stock <= 0}
                    onClick={() =>
                      handleAddToCart(product._id)
                    }
                    className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                      product.stock > 0
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={18} />

                    {product.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ShopDetails;