import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addProduct } from "../../services/productService";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Add Product
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

        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
        >
        <option value="">Select Category</option>
        <option value="Groceries">Groceries</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Medicines">Medicines</option>
        <option value="Household">Household</option>
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }
  className="w-full border p-2 rounded"
/>

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Add Product
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

export default AddProduct;