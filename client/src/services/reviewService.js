import api from "../api/axios";

// Add a review
export const addReview = async (productId, rating, comment) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/reviews",
    {
      productId,
      rating,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get reviews for a product
export const getProductReviews = async (productId) => {
  const response = await api.get(
    `/reviews/product/${productId}`
  );

  return response.data;
};