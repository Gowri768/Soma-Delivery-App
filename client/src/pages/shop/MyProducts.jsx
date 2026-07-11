import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getMyProducts,
  deleteProduct,
} from "../../services/productService";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products);
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
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Products
      </h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

  <table className="w-full">

    <thead className="bg-orange-600 text-white">
      <tr>
        <th className="p-3">Image</th>
        <th className="p-3">Name</th>
        <th className="p-3">Category</th>
        <th className="p-3">Price</th>
        <th className="p-3">Stock</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>

    <tbody>

      {products.map((product) => (

        <tr
          key={product._id}
          className="border-b hover:bg-gray-50 transition"
        >

          <td className="p-3">
            <img
              src={
                product.image ||
                "https://placehold.co/80x80?text=No+Image"
              }
              alt={product.name}
              className="w-16 h-16 rounded object-cover"
            />
          </td>

          <td className="p-3 font-medium">
            {product.name}
          </td>

          <td className="p-3">
            {product.category}
          </td>

          <td className="p-3">
            ₹{product.price}
          </td>

          <td className="p-3">
            {product.stock}
          </td>

          <td className="p-3">

            <button
                onClick={() => navigate(`/shop/edit-product/${product._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
            >
            Edit
            </button>

            <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
            Delete
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

     
    </DashboardLayout>
  );
}

export default MyProducts;