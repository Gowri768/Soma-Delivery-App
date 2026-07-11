import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getShopDashboard } from "../../services/orderService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getShopDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Shop Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboard.totalOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">
            Pending Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboard.pendingOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500 text-sm">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₹{dashboard.revenue}
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;