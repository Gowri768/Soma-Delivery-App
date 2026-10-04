import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopLayout from "../../components/layout/ShopLayout";
import BackButton from "../../components/common/BackButton";
import { addProduct } from "../../services/productService";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    unit: "piece",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("unit", formData.unit);

      if (image) {
        data.append("image", image);
      }

      await addProduct(data);

      alert("Product added successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        unit: "piece",
      });

      setImage(null);

      navigate("/shop/my-products");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShopLayout>
      <div className="max-w-3xl mx-auto">
        <BackButton />

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Product
          </h1>

          <p className="text-gray-500 mb-8">
            Add a product to your shop
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Product Name */}
            <div>
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
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                step="0.01"
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
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Dairy">Dairy</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Household">Household</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Available Quantity
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Enter available quantity"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Unit (Selling Unit)
              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="litre">Litre (L) - per litre</option>
                <option value="kg">Kilogram (kg) - per kg</option>
                <option value="g">Gram (g) - per gram</option>
                <option value="ml">Millilitre (ml) - per ml</option>
                <option value="piece">Piece - per piece</option>
                <option value="packet">Packet - per packet</option>
                <option value="box">Box - per box</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-3 rounded-xl bg-white"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </ShopLayout>
  );
}

export default AddProduct;