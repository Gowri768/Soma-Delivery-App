import { useEffect, useState } from "react";

import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  MapPin,
  IndianRupee,
} from "lucide-react";

import {
  getDeliveryOrders,
  updateDeliveryStatus,
  getDeliveryEarnings,
} from "../../services/deliveryService";

import DeliveryLayout from "../../components/layout/DeliveryLayout";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchEarnings();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getDeliveryOrders();

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch delivery orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEarnings = async () => {
    try {
      const data = await getDeliveryEarnings();

      setEarnings(data.totalEarnings || 0);
    } catch (error) {
      console.error(
        "Failed to fetch delivery earnings:",
        error
      );
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);

      const data = await updateDeliveryStatus(
        orderId,
        status
      );

      alert(data.message);

      await fetchOrders();

      // Refresh earnings after delivery status changes.
      await fetchEarnings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update delivery status"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  const assignedOrders = orders.length;

  const outForDelivery = orders.filter(
    (order) => order.status === "Out for Delivery"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Accepted" ||
      order.status === "Preparing"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <DeliveryLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading delivery dashboard...
          </p>
        </div>
      </DeliveryLayout>
    );
  }

  return (
    <DeliveryLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Delivery Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your assigned deliveries.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Assigned */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Assigned Orders
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {assignedOrders}
                </h2>
              </div>

              <div className="bg-blue-100 p-3 rounded-xl">
                <Package
                  size={26}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Pending
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {pendingOrders}
                </h2>
              </div>

              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock
                  size={26}
                  className="text-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Out for Delivery */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Out for Delivery
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {outForDelivery}
                </h2>
              </div>

              <div className="bg-orange-100 p-3 rounded-xl">
                <Truck
                  size={26}
                  className="text-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Delivered
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {deliveredOrders}
                </h2>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle
                  size={26}
                  className="text-green-600"
                />
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Earnings
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  ₹{earnings}
                </h2>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <IndianRupee
                  size={26}
                  className="text-green-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                My Deliveries
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Orders assigned to you
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Truck
                size={50}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                No deliveries assigned
              </h3>

              <p className="text-gray-500 mt-1">
                New delivery orders will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-2xl p-6 hover:shadow-sm transition"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h3 className="font-semibold text-gray-800">
                        #{order._id.slice(-8)}
                      </h3>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Customer */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Customer
                      </h4>

                      <p className="text-gray-700">
                        {order.customer?.fullName ||
                          "Customer"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.customer?.email}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.customer?.phone}
                      </p>
                    </div>

                    {/* Address */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin size={18} />
                        Delivery Address
                      </h4>

                      <p className="text-gray-700">
                        {order.address?.fullName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.address?.house},{" "}
                        {order.address?.village}
                      </p>

                      <p className="text-sm text-gray-500">
                        Pincode: {order.address?.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border-t pt-5">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Order Items
                    </h4>

                    <div className="space-y-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            {item.product?.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}

                            <div>
                              <p className="font-medium text-gray-800">
                                {item.product?.name ||
                                  "Product"}
                              </p>

                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="font-medium text-gray-800">
                            ₹
                            {(item.product?.price || 0) *
                              item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t mt-5 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-2xl font-bold text-orange-600">
                        ₹{order.total}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {(order.status === "Accepted" ||
                        order.status === "Preparing") && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              order._id,
                              "Out for Delivery"
                            )
                          }
                          disabled={
                            updatingOrder === order._id
                          }
                          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition disabled:opacity-50"
                        >
                          {updatingOrder === order._id
                            ? "Updating..."
                            : "Start Delivery"}
                        </button>
                      )}

                      {order.status === "Out for Delivery" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              order._id,
                              "Delivered"
                            )
                          }
                          disabled={
                            updatingOrder === order._id
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-medium transition disabled:opacity-50"
                        >
                          {updatingOrder === order._id
                            ? "Updating..."
                            : "Mark Delivered"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DeliveryLayout>
  );
}

export default Dashboard;