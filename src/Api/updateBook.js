import axios from "axios";
export const updateBook = async (id,data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:5000/api/books/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi không xác định");
  }
};

