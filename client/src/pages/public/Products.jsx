import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(search, category);

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Explore Products
          </h1>

          <p className="text-gray-500 mt-2">
            Find everything you need from your favorite local shops.
          </p>

        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

          <div className="relative">

            <Search
              size={22}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* Active category */}
          <div className="flex items-center gap-2 mt-4 text-gray-600">

            <SlidersHorizontal size={18} />

            <span>
              Category:
            </span>

            <span className="font-semibold text-orange-600">
              {category}
            </span>

          </div>

        </div>

        {/* Product count */}
        {!loading && (
          <div className="mb-5">

            <p className="text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} found
            </p>

          </div>
        )}

        {/* Loading */}
        {loading ? (

          <div className="flex justify-center py-20">

            <div className="text-gray-500 text-lg">
              Loading products...
            </div>

          </div>

        ) : products.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">

            <div className="text-5xl mb-4">
              🛍️
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for a different product.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;