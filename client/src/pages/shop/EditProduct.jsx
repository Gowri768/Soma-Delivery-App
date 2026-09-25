import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShopLayout from "../../components/layout/ShopLayout";
import BackButton from "../../components/common/BackButton";
import {
  getProductById,
  updateProduct,
} from "../../services/productService";
import { PackageCheck } from "lucide-react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);

      setFormData({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        category: data.product.category || "",
        stock: data.product.stock || "",
        image: data.product.image || "",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to load product"
      );
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await updateProduct(id, formData);

      setMessage(data.message);

      setTimeout(() => {
        navigate("/shop/my-products");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ShopLayout>
        <div>
          <BackButton />

          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">
              Loading product...
            </p>
          </div>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <PackageCheck
              size={30}
              className="text-blue-600"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-1">
              Update your product information.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Medicines">Medicines</option>
                <option value="Household">Household</option>
              </select>
            </div>

            {/* Current Image */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Current Product Image
              </label>

              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/shop/my-products")}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-xl"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-5 bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}

export default EditProduct;