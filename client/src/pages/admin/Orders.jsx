import { useEffect, useState } from "react";

import {
  ShoppingBag,
  UserCircle,
  Truck,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingOrder, setUpdatingOrder] = useState(null);

  const statuses = [
    "Pending",
    "Accepted",
    "Rejected",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    fetchOrders();
    fetchDeliveryPartners();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin/orders");

      console.log("Admin Orders API:", response.data);

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to load admin orders:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryPartners = async () => {
    try {
      const response = await api.get(
        "/admin/delivery-partners"
      );

      console.log(
        "Delivery Partners API:",
        response.data
      );

      setDeliveryPartners(
        response.data.deliveryPartners || []
      );
    } catch (error) {
      console.error(
        "Failed to load delivery partners:",
        error
      );
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);

      const response = await api.put(
        `/admin/orders/${orderId}/status`,
        { status }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  const assignPartner = async (
    orderId,
    deliveryPartnerId
  ) => {
    if (!deliveryPartnerId) {
      return;
    }

    try {
      setUpdatingOrder(orderId);

      const response = await api.put(
        `/admin/orders/${orderId}/delivery-partner`,
        {
          deliveryPartnerId,
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );
    } catch (error) {
      console.error(
        "Failed to assign delivery partner:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to assign delivery partner"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Accepted":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Preparing":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading orders...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg font-semibold">
              {error}
            </p>

            <p className="text-gray-500 mt-2">
              Check the browser console for more details.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all orders placed on Soma
            Delivery.
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-pink-100 p-3 rounded-xl">
              <ShoppingBag
                size={25}
                className="text-pink-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {orders.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag
                size={55}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-4">
                No orders found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Order
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Delivery Partner
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Change Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Order */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-xl">
                            <ShoppingBag
                              size={22}
                              className="text-gray-500"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              #{order._id.slice(-8)}
                            </p>

                            <p className="text-xs text-gray-400">
                              {order.items?.length || 0}{" "}
                              item(s)
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <UserCircle
                            size={20}
                            className="text-gray-500"
                          />

                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {order.customer?.fullName ||
                                "Unknown"}
                            </p>

                            <p className="text-xs text-gray-400">
                              {order.customer?.phone || ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Delivery Partner */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Truck
                              size={20}
                              className="text-gray-500"
                            />

                            <span className="text-sm text-gray-700">
                              {order.deliveryPartner
                                ?.fullName ||
                                "Not Assigned"}
                            </span>
                          </div>

                          <select
                            value={
                              order.deliveryPartner?._id ||
                              ""
                            }
                            disabled={
                              updatingOrder === order._id
                            }
                            onChange={(e) =>
                              assignPartner(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                          >
                            <option value="">
                              Assign Partner
                            </option>

                            {deliveryPartners.map(
                              (partner) => (
                                <option
                                  key={partner._id}
                                  value={partner._id}
                                >
                                  {partner.fullName}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1 font-semibold text-gray-800">
                          <IndianRupee size={15} />
                          {order.total || 0}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Change Status */}
                      <td className="px-6 py-5">
                        <select
                          value={order.status}
                          disabled={
                            updatingOrder === order._id
                          }
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                        >
                          {statuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays size={16} />

                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Orders;