import { useEffect, useState } from "react";

import {
  Users as UsersIcon,
  UserCircle,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");

      console.log("Admin Users API:", response.data);

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Failed to load users:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      setUpdatingUser(userId);

      const response = await api.put(
        `/admin/users/${userId}/role`,
        { role }
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === userId
            ? response.data.user
            : user
        )
      );
    } catch (error) {
      console.error("Failed to update role:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update user role"
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";

      case "shopOwner":
        return "bg-purple-100 text-purple-700";

      case "deliveryPartner":
        return "bg-blue-100 text-blue-700";

      case "customer":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      user.email
        ?.toLowerCase()
        .includes(searchText) ||
      user.phone
        ?.toLowerCase()
        .includes(searchText) ||
      user.role
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Loading users...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div>
          <BackButton />

          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 text-lg font-semibold">
                {error}
              </p>

              <p className="text-gray-500 mt-2">
                Check the browser console for more details.
              </p>
            </div>
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
            Users
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all registered users.
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <UsersIcon
                size={25}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-bold text-gray-800">
                {users.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <input
            type="text"
            placeholder="Search users by name, email, phone or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <UsersIcon
                size={55}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-4">
                {search
                  ? "No users match your search."
                  : "No users found."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Current Role
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Change Role
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* User */}
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
                              {user.fullName}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: {user._id.slice(-8)}
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

                          <span>{user.email}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone
                            size={17}
                            className="text-gray-500"
                          />

                          <span>{user.phone}</span>
                        </div>
                      </td>

                      {/* Current Role */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyle(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Change Role */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Shield
                            size={17}
                            className="text-gray-500"
                          />

                          <select
                            value={user.role}
                            disabled={
                              updatingUser === user._id
                            }
                            onChange={(e) =>
                              updateRole(
                                user._id,
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                          >
                            <option value="customer">
                              Customer
                            </option>

                            <option value="shopOwner">
                              Shop Owner
                            </option>

                            <option value="deliveryPartner">
                              Delivery Partner
                            </option>
                          </select>
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

export default Users;