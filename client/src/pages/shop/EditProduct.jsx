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
    unit: "piece",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
        stock: data.product.stock ?? "",
        unit: data.product.unit || "piece",
        image: data.product.image || "",
      });
      setImagePreview(data.product.image || "");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("unit", formData.unit);

      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await updateProduct(id, data);

      setMessage(res.message || "Product updated successfully!");

      setTimeout(() => {
        navigate("/shop/my-products");
      }, 1000);
    } catch (error) {
      console.error(error);
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
                step="0.01"
                required
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Available Quantity
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
                className="w-full border border-gray-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Image Preview & Upload */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 p-2 rounded-xl bg-white text-sm"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Upload a new image to replace the current image.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">Preview</span>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={formData.name}
                    className="w-24 h-24 rounded-xl object-cover border shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/shop/my-products")}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-xl transition shadow-md"
            >
              {loading ? "Updating Product..." : "Update Product"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className={`mt-5 p-4 rounded-xl border font-medium ${
            message.toLowerCase().includes("fail") || message.toLowerCase().includes("error")
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-green-50 border-green-200 text-green-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}

export default EditProduct;