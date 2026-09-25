import { useEffect, useState } from "react";

import { getMyOrders } from "../../services/orderService";

import {
  Package,
  CalendarDays,
  IndianRupee,
  ShoppingBag,
  Truck,
  CheckCircle,
} from "lucide-react";

import api from "../../api/axios";
import BackButton from "../../components/common/BackButton";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [applicationStatus, setApplicationStatus] =
    useState("none");

  const [applying, setApplying] = useState(false);

  const [applicationMessage, setApplicationMessage] =
    useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getMyOrders();

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the logged-in user's delivery partner status
  const fetchApplicationStatus = async () => {
    try {
      const response = await api.get(
        "/delivery-application/my-status"
      );

      const user = response.data.user;

      if (user.role === "deliveryPartner") {
        setApplicationStatus("approved");
      } else {
        setApplicationStatus(
          user.deliveryPartnerStatus || "none"
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch delivery application status:",
        error
      );
    }
  };

  const applyAsDeliveryPartner = async () => {
    try {
      setApplying(true);
      setApplicationMessage("");

      const response = await api.post(
        "/delivery-application/apply"
      );

      setApplicationStatus(
        response.data.user.deliveryPartnerStatus
      );

      setApplicationMessage(
        response.data.message
      );
    } catch (error) {
      console.error(
        "Delivery partner application error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Failed to submit application";

      setApplicationMessage(message);

      if (
        message.toLowerCase().includes("already pending")
      ) {
        setApplicationStatus("pending");
      }

      if (
        message.toLowerCase().includes("already approved")
      ) {
        setApplicationStatus("approved");
      }

      if (
        message
          .toLowerCase()
          .includes("already a delivery partner")
      ) {
        setApplicationStatus("approved");
      }
    } finally {
      setApplying(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <BackButton />

          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Package
                size={30}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                My Orders
              </h1>

              <p className="text-gray-500 mt-1">
                Track and view all your orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Delivery Partner Application */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-orange-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-xl">
                <Truck
                  size={30}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Become a Delivery Partner
                </h2>

                <p className="text-gray-500 mt-1">
                  Earn by delivering orders with Soma
                  Delivery.
                </p>

                {applicationMessage && (
                  <p className="text-sm text-orange-600 mt-2">
                    {applicationMessage}
                  </p>
                )}
              </div>
            </div>

            {applicationStatus === "pending" ? (
              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-3 rounded-xl font-semibold">
                <CheckCircle size={18} />
                Application Pending
              </div>
            ) : applicationStatus === "approved" ? (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold">
                <CheckCircle size={18} />
                Approved
              </div>
            ) : (
              <button
                onClick={applyAsDeliveryPartner}
                disabled={applying}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {applying
                  ? "Submitting..."
                  : "Apply Now"}
              </button>
            )}
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md mx-auto">
            <div className="flex justify-center mb-5">
              <div className="bg-orange-100 p-5 rounded-full">
                <ShoppingBag
                  size={45}
                  className="text-orange-500"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              No Orders Yet
            </h1>

            <p className="text-gray-500 mt-3">
              You haven't placed any orders yet. Start
              shopping and your orders will appear here.
            </p>

            <a
              href="/products"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-bold text-gray-800 break-all">
                      #{order._id}
                    </h2>
                  </div>

                  <span
                    className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Information */}
                <div className="grid sm:grid-cols-3 gap-4 border-t border-b py-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <IndianRupee
                        size={18}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Total Amount
                      </p>

                      <p className="font-bold text-gray-800">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <CalendarDays
                        size={18}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Ordered On
                      </p>

                      <p className="font-semibold text-gray-800">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Package
                        size={18}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Items
                      </p>

                      <p className="font-semibold text-gray-800">
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ordered Products */}
                {order.items?.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-bold text-gray-800 mb-4">
                      Ordered Items
                    </h3>

                    <div className="space-y-3">
                      {order.items.map(
                        (item, index) => (
                          <div
                            key={
                              item.product?._id ||
                              index
                            }
                            className="flex items-center justify-between gap-4 bg-gray-50 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-4">
                              {item.product?.image ? (
                                <img
                                  src={
                                    item.product.image
                                  }
                                  alt={
                                    item.product.name
                                  }
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center">
                                  <Package
                                    size={24}
                                    className="text-orange-500"
                                  />
                                </div>
                              )}

                              <div>
                                <p className="font-semibold text-gray-800">
                                  {item.product?.name ||
                                    "Product"}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Quantity:{" "}
                                  {item.quantity}
                                </p>
                              </div>
                            </div>

                            <p className="font-bold text-gray-800">
                              ₹
                              {item.product?.price
                                ? item.product.price *
                                  item.quantity
                                : 0}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;