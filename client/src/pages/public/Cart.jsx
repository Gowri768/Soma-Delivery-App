import { useEffect, useState } from "react";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>
      </div>
    );
  }
  const handleQuantity = async (productId, action) => {
  try {
    await updateCartQuantity(productId, action);

    fetchCart();

  } catch (error) {
    console.error(error);
  }
};
const handleRemove = async (productId) => {
  const confirmDelete = window.confirm(
    "Remove this product from cart?"
  );

  if (!confirmDelete) return;

  try {
    await removeFromCart(productId);

    fetchCart();

  } catch (error) {
    console.error(error);
  }
};
const subtotal = cart
  ? cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    )
  : 0;

const deliveryCharge = subtotal > 0 ? 20 : 0;

const total = subtotal + deliveryCharge;
  return (
    

  <div className="max-w-6xl mx-auto p-8">

    <h1 className="text-4xl font-bold mb-8">
      Shopping Cart
    </h1>

    <div className="space-y-6">

      {cart.items.map((item) => (

        <div
          key={item.product._id}
          className="flex items-center justify-between bg-white shadow-md rounded-xl p-5"
        >

          <div className="flex items-center gap-5">

            <img
              src={
                item.product.image ||
                "https://placehold.co/120x120?text=No+Image"
              }
              alt={item.product.name}
              className="w-24 h-24 rounded object-cover"
            />

            <div>

              <h2 className="text-xl font-bold">
                {item.product.name}
              </h2>

              <p className="text-gray-500">
                {item.product.category}
              </p>

              <p className="text-orange-600 font-bold mt-2">
                ₹{item.product.price}
              </p>

            </div>

          </div>

          <div>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  handleQuantity(item.product._id, "decrease")
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  handleQuantity(item.product._id, "increase")
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>

            </div>

            <button
              onClick={() => handleRemove(item.product._id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* Order Summary */}

    <div className="mt-10 flex justify-end">

      <div className="bg-white shadow-md rounded-xl p-6 w-80">

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
  onClick={() => navigate("/checkout")}
  className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg"
>
  Proceed to Checkout
</button>

      </div>

    </div>

  </div>

);
}
export default Cart;