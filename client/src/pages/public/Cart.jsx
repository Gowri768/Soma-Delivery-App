import { useEffect, useState } from "react";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";
import BackButton from "../../components/common/BackButton";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <BackButton />

          <div className="flex justify-center mb-5">
            <div className="bg-orange-100 p-5 rounded-full">
              <ShoppingCart
                size={45}
                className="text-orange-500"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 0 ? 20 : 0;

  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton />

          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-xl">
              <ShoppingCart
                size={30}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-1">
                Review your items before checkout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Image */}
                  <img
                    src={
                      item.product.image ||
                      "https://placehold.co/160x160?text=No+Image"
                    }
                    alt={item.product.name}
                    className="w-32 h-32 rounded-xl object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {item.product.category}
                    </p>

                    <p className="text-orange-600 font-bold text-lg mt-3">
                      ₹{item.product.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          handleQuantity(
                            item.product._id,
                            "decrease"
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold min-w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantity(
                            item.product._id,
                            "increase"
                          )
                        }
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Item Total + Remove */}
                  <div className="flex sm:flex-col justify-between items-end">
                    <p className="font-bold text-lg">
                      ₹{item.product.price * item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        handleRemove(item.product._id)
                      }
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge}</span>
                </div>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-orange-600">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;