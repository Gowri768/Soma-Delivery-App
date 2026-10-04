import api from "../api/axios";

export const getProducts = async (search = "", category = "All") => {
  const response = await api.get("/products", {
    params: {
      search,
      category,
    },
  });

  return response.data;
};

export const addProduct = async (productData) => {
  const token = localStorage.getItem("token");

  let formData;

  if (productData instanceof FormData) {
    formData = productData;
  } else {
    formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);
    formData.append("unit", productData.unit || "piece");

    if (productData.image) {
      formData.append("image", productData.image);
    }
  }

  const response = await api.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
  
export const getMyProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/products/my-products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (productData instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const response = await api.put(
    `/products/${id}`,
    productData,
    { headers }
  );

  return response.data;
};
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};