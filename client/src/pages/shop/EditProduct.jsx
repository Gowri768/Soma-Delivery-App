import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getProductById,
  updateProduct,
} from "../../services/productService";

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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);

      setFormData({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        image: data.product.image,
      });

    } catch (error) {
      console.error(error);
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
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>

      </form>

      {message && (
        <p className="mt-4 text-orange-600 font-medium">
          {message}
        </p>
      )}

    </DashboardLayout>
  );
}

export default EditProduct;