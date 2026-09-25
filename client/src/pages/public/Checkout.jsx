import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  placeOrder,
  processMockPayment,
} from "../../services/orderService";

import {
  MapPin,
  Phone,
  User,
  Home,
  Map,
  CreditCard,
  Banknote,
  ShieldCheck,
  Loader2,
} from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    house: "",
    village: "",
    pincode: "",
    landmark: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [showPayment, setShowPayment] =
    useState(false);

  const [currentOrder, setCurrentOrder] =
    useState(null);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // VALIDATE ADDRESS
  // ==========================================

  const validateAddress = () => {
    const {
      fullName,
      phone,
      house,
      village,
      pincode,
    } = address;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !house.trim() ||
      !village.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all required address fields.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return false;
    }

    return true;
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAddress()) {
      return;
    }

    try {
      setLoading(true);

      const data = await placeOrder(
        address,
        paymentMethod
      );

      if (!data.success) {
        alert(data.message || "Unable to place order.");
        return;
      }

      // ========================================
      // COD
      // ========================================

      if (paymentMethod === "COD") {
        alert(
          "Order placed successfully with Cash on Delivery!"
        );

        window.dispatchEvent(
          new Event("cartUpdated")
        );

        navigate("/my-orders");
        return;
      }

      // ========================================
      // ONLINE PAYMENT
      // ========================================

      setCurrentOrder(data.order);
      setShowPayment(true);
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // MOCK PAYMENT
  // ==========================================

  const handleMockPayment = async () => {
    if (!currentOrder?._id) {
      alert("Order information is missing.");
      return;
    }

    try {
      setPaymentLoading(true);

      const data = await processMockPayment(
        currentOrder._id
      );

      if (!data.success) {
        alert(
          data.message || "Payment failed."
        );
        return;
      }

      alert(
        `Payment successful!\n\nTransaction ID: ${data.transactionId}`
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate("/my-orders");
    } catch (error) {
      console.error(
        "Mock payment error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // ==========================================
  // PAYMENT SCREEN
  // ==========================================

  if (showPayment && currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

            {/* Header */}
            <div className="bg-green-600 text-white px-6 py-5">
              <div className="flex items-center gap-3">
                <CreditCard size={28} />

                <div>
                  <h2 className="text-xl font-bold">
                    Online Payment
                  </h2>

                  <p className="text-green-100 text-sm">
                    Secure Soma Delivery Payment
                  </p>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="px-6 py-6 text-center border-b">
              <p className="text-gray-500 text-sm">
                Amount to Pay
              </p>

              <p className="text-4xl font-bold text-gray-900 mt-2">
                ₹{currentOrder.total}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Order #{currentOrder._id.slice(-6)}
              </p>
            </div>

            {/* Mock Payment Info */}
            <div className="p-6">

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <ShieldCheck
                    className="text-blue-600 shrink-0"
                    size={22}
                  />

                  <div>
                    <p className="font-semibold text-blue-900">
                      Demo Payment Mode
                    </p>

                    <p className="text-sm text-blue-700 mt-1">
                      This is a simulated payment for
                      the Soma Delivery project.
                      No real money will be charged.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="border rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard
                    size={22}
                    className="text-green-600"
                  />

                  <div>
                    <p className="font-semibold">
                      Online Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      Demo Card / UPI Payment
                    </p>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleMockPayment}
                disabled={paymentLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {paymentLoading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay ₹{currentOrder.total}
                  </>
                )}
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={() =>
                  navigate("/cart")
                }
                disabled={paymentLoading}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Cancel Payment
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Checkout
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your delivery details and choose
          a payment method.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >

          {/* ============================= */}
          {/* DELIVERY ADDRESS */}
          {/* ============================= */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-6">
              Delivery Address
            </h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full border rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  className="w-full border rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* House */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House / Door No. *
              </label>

              <div className="relative">
                <Home
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="house"
                  value={address.house}
                  onChange={handleChange}
                  placeholder="House number / street"
                  className="w-full border rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Village */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Village *
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="village"
                  value={address.village}
                  onChange={handleChange}
                  placeholder="Village name"
                  className="w-full border rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>

              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength={6}
                className="w-full border rounded-xl py-3 px-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark
              </label>

              <div className="relative">
                <Map
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleChange}
                  placeholder="Nearby landmark (optional)"
                  className="w-full border rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

          </div>

          {/* ============================= */}
          {/* PAYMENT */}
          {/* ============================= */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-6">
              Payment Method
            </h2>

            {/* COD */}
            <button
              type="button"
              onClick={() =>
                setPaymentMethod("COD")
              }
              className={`w-full border rounded-xl p-4 mb-4 text-left transition ${
                paymentMethod === "COD"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  <Banknote
                    className="text-green-600"
                    size={23}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>

              </div>
            </button>

            {/* ONLINE */}
            <button
              type="button"
              onClick={() =>
                setPaymentMethod("ONLINE")
              }
              className={`w-full border rounded-xl p-4 text-left transition ${
                paymentMethod === "ONLINE"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard
                    className="text-blue-600"
                    size={23}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Online Payment
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay using our secure demo payment
                  </p>
                </div>

              </div>
            </button>

            {/* ONLINE NOTICE */}
            {paymentMethod === "ONLINE" && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  You will be taken to the payment
                  screen after placing the order.
                  This project currently uses a
                  simulated payment.
                </p>
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Placing Order...
                </>
              ) : paymentMethod === "COD" ? (
                "Place Order • COD"
              ) : (
                "Continue to Payment"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Checkout;