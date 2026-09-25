import api from "../api/axios";

export const submitContact = async (contactData) => {
  const response = await api.post("/contact", contactData);

  return response.data;
};