import { useEffect, useState } from "react";

import {
  Package,
  MapPin,
  User,
  Phone,
  IndianRupee,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import DeliveryLayout from "../../components/layout/DeliveryLayout";
import BackButton from "../../components/common/BackButton";
import { getDeliveryHistory } from "../../services/deliveryService";

function DeliveryHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const data = await getDeliveryHistory();

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "Failed to fetch delivery history:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <DeliveryLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading delivery history...
          </p>
        </div>
      </DeliveryLayout>
    );
  }

  return (
    <DeliveryLayout>
      <div>
        <BackButton />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Delivery History
          </h1>

          <p className="text-gray-500 mt-1">
            View all your completed deliveries.
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <Package
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-700">
              No completed deliveries
            </h2>

            <p className="text-gray-500 mt-2">
              Your completed deliveries will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-semibold text-gray-800 mt-1">
                      #{order._id.slice(-8).toUpperCase()}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Delivered
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Customer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User
                        size={19}
                        className="text-orange-600"
                      />

                      <h3 className="font-semibold text-gray-800">
                        Customer
                      </h3>
                    </div>

                    <p className="text-gray-700">
                      {order.customer?.fullName || "N/A"}
                    </p>

                    {order.customer?.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <Phone size={15} />
                        {order.customer.phone}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin
                        size={19}
                        className="text-orange-600"
                      />

                      <h3 className="font-semibold text-gray-800">
                        Delivery Address
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm">
                      {order.address?.house},{" "}
                      {order.address?.village},{" "}
                      {order.address?.pincode}
                    </p>
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-5 border-t">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={20}
                      className="text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-500">
                        Delivered On
                      </p>

                      <p className="font-semibold text-gray-800">
                        {formatDate(order.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center gap-3">
                    <IndianRupee
                      size={20}
                      className="text-gray-500"
                    />

                    <div>
                      <p className="text-xs text-gray-500">
                        Order Total
                      </p>

                      <p className="font-semibold text-gray-800">
                        ₹{order.total || 0}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Earnings */}
                  <div className="flex items-center gap-3">
                    <IndianRupee
                      size={20}
                      className="text-green-600"
                    />

                    <div>
                      <p className="text-xs text-gray-500">
                        Delivery Earnings
                      </p>

                      <p className="font-semibold text-green-600">
                        ₹{order.deliveryCharge || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-6 pt-5 border-t">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Items
                  </h3>

                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div
                        key={item.product?._id || index}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.product?.name || "Product"} ×{" "}
                          {item.quantity}
                        </span>

                        <span className="font-medium text-gray-700">
                          ₹
                          {(
                            (item.product?.price || 0) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DeliveryLayout>
  );
}

export default DeliveryHistory;
