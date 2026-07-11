import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";
function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToCart = async () => {
  try {
    const data = await addToCart(product._id);

    alert(data.message);

  } catch (error) {
    alert(
      error.response?.data?.message || "Failed to add to cart"
    );
  }
};

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={
            product.image ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={product.name}
          className="w-full rounded-xl shadow-md"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <p className="mt-6 text-3xl text-orange-600 font-bold">
            ₹{product.price}
          </p>

          <p className="mt-4">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="mt-2">
            <strong>Stock:</strong> {product.stock}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg"
          >
          Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;