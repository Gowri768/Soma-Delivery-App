import api from "../api/axios";

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/cart/add",
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCart = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getCartCount = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateCartQuantity = async (productId, action) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/cart/update",
    {
      productId,
      action,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await api.delete("/cart/remove", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      productId,
    },
  });

  return response.data;
};