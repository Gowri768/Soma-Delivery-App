import { useEffect, useState } from "react";

import {
  UserCircle,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/axios";

function DeliveryApplications() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get(
        "/admin/delivery-applications"
      );

      console.log(
        "Delivery Applications API:",
        response.data
      );

      setApplications(
        response.data.applications || []
      );
    } catch (error) {
      console.error(
        "Failed to load delivery applications:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (
    userId,
    action
  ) => {
    try {
      setUpdatingUser(userId);

      const response = await api.put(
        `/admin/delivery-applications/${userId}`,
        { action }
      );

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) =>
            application._id !== userId
        )
      );

      alert(response.data.message);
    } catch (error) {
      console.error(
        "Failed to update application:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application"
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading applications...
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
            Delivery Partner Applications
          </h1>

          <p className="text-gray-500 mt-1">
            Review users who want to become delivery
            partners.
          </p>
        </div>

        {/* Application Count */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock
                size={25}
                className="text-yellow-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Applications
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {applications.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {applications.length === 0 ? (
            <div className="py-16 text-center">
              <Clock
                size={55}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-4">
                No delivery partner applications found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Applicant
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Applicant */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-xl">
                            <UserCircle
                              size={24}
                              className="text-gray-500"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {application.fullName}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID:{" "}
                              {application._id.slice(-8)}
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
                            {application.email}
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
                            {application.phone}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          {application.deliveryPartnerStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateApplication(
                                application._id,
                                "approve"
                              )
                            }
                            disabled={
                              updatingUser ===
                              application._id
                            }
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateApplication(
                                application._id,
                                "reject"
                              )
                            }
                            disabled={
                              updatingUser ===
                              application._id
                            }
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
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

export default DeliveryApplications;