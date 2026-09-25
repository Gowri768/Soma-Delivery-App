import { useEffect, useState } from "react";

import {
  Package,
  Store,
  IndianRupee,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/admin/products");

      console.log("Admin Products API:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to load admin products:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading products...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div>
          <BackButton />

          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-lg font-semibold">
                {error}
              </p>

              <p className="text-gray-500 mt-2">
                Check the browser console for more details.
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all products available on Soma Delivery.
          </p>
        </div>

        {/* Product Count */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Package
                size={25}
                className="text-yellow-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {products.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {products.length === 0 ? (
            <div className="py-16 text-center">
              <Package
                size={55}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-4">
                No products found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Shop Owner
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Category
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Product */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-xl">
                            <Package
                              size={24}
                              className="text-gray-500"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: {product._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1 font-semibold text-gray-800">
                          <IndianRupee size={15} />
                          {product.price}
                        </div>
                      </td>

                      {/* Shop Owner */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Store
                            size={17}
                            className="text-gray-500"
                          />

                          <span className="text-gray-700">
                            {product.shopOwner?.fullName ||
                              "Unknown"}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-gray-600">
                        {product.category || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Products;