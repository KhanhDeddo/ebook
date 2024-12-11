import axios from "axios";
export const updateOrder = async (order_id,data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:5000/api/orders/${order_id}`, data); // Gửi POST request
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi không xác định khi thêm vào giỏ hàng");
  }
};

