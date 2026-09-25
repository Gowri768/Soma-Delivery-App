import { useEffect, useState } from "react";

import {
  Truck,
  UserCircle,
  Phone,
  Mail,
  CalendarDays,
} from "lucide-react";


import AdminLayout from "../../layouts/AdminLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/axios";

function DeliveryPartners() {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDeliveryPartners();
  }, []);

  const fetchDeliveryPartners = async () => {
    try {
      const response = await api.get(
        "/admin/delivery-partners"
      );

      console.log(
        "Admin Delivery Partners API:",
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

      setError(
        error.response?.data?.message ||
          "Failed to load delivery partners"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading delivery partners...
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
        <BackButton />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Delivery Partners
          </h1>

          <p className="text-gray-500 mt-1">
            View all delivery partners registered on Soma
            Delivery.
          </p>
        </div>

        {/* Total Partners */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Truck
                size={25}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Delivery Partners
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {deliveryPartners.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {deliveryPartners.length === 0 ? (
            <div className="py-16 text-center">
              <Truck
                size={55}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-4">
                No delivery partners found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Partner
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Joined
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
  Deliveries
</th>

<th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
  Earnings
</th>
                  </tr>
                </thead>

                <tbody>
                  {deliveryPartners.map((partner) => (
                    <tr
                      key={partner._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Partner */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-xl">
                            <UserCircle
                              size={24}
                              className="text-blue-600"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {partner.fullName}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID:{" "}
                              {partner._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail
                            size={17}
                            className="text-gray-500"
                          />

                          <span>
                            {partner.email}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone
                            size={17}
                            className="text-gray-500"
                          />

                          <span>
                            {partner.phone}
                          </span>
                        </div>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays size={16} />

                          {partner.createdAt
                            ? new Date(
                                partner.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          Delivery Partner
                        </span>
                      </td>
                      {/* Deliveries */}
<td className="px-6 py-5">
  <span className="font-semibold text-gray-800">
    {partner.totalDeliveries || 0}
  </span>
</td>

{/* Earnings */}
<td className="px-6 py-5">
  <span className="font-semibold text-green-600">
    ₹{partner.totalEarnings || 0}
  </span>
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

export default DeliveryPartners;