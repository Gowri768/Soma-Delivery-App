import api from "../api/axios";

export const getDeliveryOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/orders/delivery-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;

};

export const updateDeliveryStatus = async (orderId, status) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/orders/${orderId}/delivery-status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getDeliveryEarnings = async () => {
  const response = await api.get(
    "/orders/delivery-earnings"
  );

  return response.data;
};
export const getDeliveryHistory = async () => {
  const response = await api.get(
    "/orders/delivery-history"
  );

  return response.data;
};