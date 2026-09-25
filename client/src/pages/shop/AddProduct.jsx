import { useState } from "react";
import ShopLayout from "../../components/layout/ShopLayout";
import BackButton from "../../components/common/BackButton";
import { addProduct } from "../../services/productService";
import { PackagePlus } from "lucide-react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const data = await addProduct(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
      });

      // Reset file input
      document.getElementById("product-image").value = "";
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShopLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-xl">
              <PackagePlus
                size={30}
                className="text-orange-600"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Add Product
              </h1>

              <p className="text-gray-500 mt-1">
                Add a new product to your shop.
              </p>
            </div>
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
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Groceries">
                  Groceries
                </option>

                <option value="Vegetables">
                  Vegetables
                </option>

                <option value="Fruits">
                  Fruits
                </option>

                <option value="Dairy">
                  Dairy
                </option>

                <option value="Medicines">
                  Medicines
                </option>

                <option value="Household">
                  Household
                </option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Product Image
              </label>

              <input
                id="product-image"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  })
                }
                className="w-full border border-gray-300 p-3 rounded-xl bg-white"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-5 bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-xl">
            {message}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}

export default AddProduct;