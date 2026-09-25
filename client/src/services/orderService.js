import api from "../api/axios";

// ===============================
// CUSTOMER - GET MY ORDERS
// ===============================

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ===============================
// CUSTOMER - PLACE ORDER
// ===============================

export const placeOrder = async (
  address,
  paymentMethod = "COD"
) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/orders",
    {
      address,
      paymentMethod,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ===============================
// CUSTOMER - MOCK ONLINE PAYMENT
// ===============================

export const processMockPayment = async (orderId) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/orders/payment/mock",
    {
      orderId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ===============================
// SHOP OWNER - GET ORDERS
// ===============================

export const getShopOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/shop-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ===============================
// SHOP OWNER - UPDATE ORDER STATUS
// ===============================

export const updateOrderStatus = async (
  orderId,
  status
) => {
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

// ===============================
// SHOP OWNER - DASHBOARD
// ===============================

export const getShopDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/orders/shop-dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};