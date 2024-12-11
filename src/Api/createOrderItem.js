import axios from "axios";
export const createOrderItem = async (orderItemData) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/orderitems", orderItemData);
    return response.data; // Trả về dữ liệu phản hồi từ API
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi không xác định khi thêm vào giỏ hàng");
  }
};

