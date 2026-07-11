import api from "../api/axios";

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getShopOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/shop-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const placeOrder = async (address) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/orders",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getShopDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/shop-dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};