import { useEffect, useState } from "react";
import ShopLayout from "../../components/layout/ShopLayout";
import BackButton from "../../components/common/BackButton";
import {
  getMyProducts,
  deleteProduct,
} from "../../services/productService";
import { useNavigate } from "react-router-dom";
import {
  formatPriceWithUnit,
  formatUnitLabel,
} from "../../utils/unitUtils";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ShopLayout>
      <div>
        {/* Back Button */}
        <BackButton />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Products
          </h1>

          <button
            onClick={() => navigate("/shop/add-product")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            + Add New Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Unit</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No products added yet. Click "+ Add New Product" to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/80x80?text=No+Image"
                        }
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border"
                      />
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      {product.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="p-4 font-semibold text-orange-600">
                      {formatPriceWithUnit(product.price, product.unit)}
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatUnitLabel(product.unit, 1)}
                    </td>

                    <td className="p-4 font-medium text-gray-700">
                      {product.stock}{" "}
                      {formatUnitLabel(product.unit, product.stock)}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/shop/edit-product/${product._id}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg mr-2 font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ShopLayout>
  );
}

export default MyProducts;