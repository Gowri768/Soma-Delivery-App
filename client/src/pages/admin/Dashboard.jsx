import { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  Package,
  IndianRupee,
  Truck,
  Store,
  Clock,
} 
from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";

import RevenueChart from "../../components/charts/RevenueChart";
import OrdersPieChart from "../../components/charts/OrdersPieChart";

import api from "../../api/axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.error("Failed to load admin dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading admin dashboard...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (!dashboard) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-red-500 text-lg">
            Failed to load dashboard data.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
      icon: Users,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Shop Owners",
      value: dashboard.totalShopOwners,
      icon: Store,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Delivery Partners",
      value: dashboard.totalDeliveryPartners,
      icon: Truck,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      icon: Package,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      icon: ShoppingBag,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
    {
      title: "Revenue",
      value: `₹${dashboard.revenue || 0}`,
      icon: IndianRupee,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Overview of your Soma Delivery platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`${stat.bg} p-3 rounded-xl`}>
                    <Icon
                      size={25}
                      className={stat.color}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Revenue Overview
            </h2>

            <RevenueChart
              data={dashboard.revenueChart || []}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Order Status
            </h2>

            <OrdersPieChart
              data={dashboard.orderStatus || []}
            />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={22} className="text-orange-500" />

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500">
                Latest orders placed on the platform
              </p>
            </div>
          </div>

          {dashboard.recentOrders?.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag
                size={45}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-3">
                No orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-3 text-sm text-gray-500">
                      Order ID
                    </th>

                    <th className="py-3 px-3 text-sm text-gray-500">
                      Customer
                    </th>

                    <th className="py-3 px-3 text-sm text-gray-500">
                      Status
                    </th>

                    <th className="py-3 px-3 text-sm text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.recentOrders?.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-b-0"
                    >
                      <td className="py-4 px-3 font-medium text-gray-800">
                        #{order._id.slice(-8)}
                      </td>

                      <td className="py-4 px-3 text-gray-600">
                        {order.customer?.fullName ||
                          "Customer"}
                      </td>

                      <td className="py-4 px-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {order.status}
                        </span>
                      </td>

                      <td className="py-4 px-3 font-semibold text-gray-800">
                        ₹{order.total || 0}
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

export default Dashboard;