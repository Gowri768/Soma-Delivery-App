import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { addToCart } from "../../services/cartService";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleAddToCart = async (e) => {
  e.stopPropagation();

  try {
    const data = await addToCart(product._id, 1);

    alert("✅ Product added to cart!");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to add product to cart"
    );
  }
};
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
    >
      <img
        src={
          product.image ||
          "https://placehold.co/600x400?text=No+Image"
        }
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          📂 {product.category}
        </p>

        <p className="text-sm text-gray-500">
          🏪 {product.shopOwner?.fullName || "Local Shop"}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-orange-500">
            ₹{product.price}
          </span>

          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
            Stock: {product.stock}
          </span>

        </div>

        <div
          className="mt-5"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
  text="🛒 Add to Cart"
  onClick={handleAddToCart}
/>
<button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  }}
  className="mt-3 w-full border border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
>
  👁 View Details
</button>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;