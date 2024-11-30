import axios from "axios";
export const updateCartItem = async (user_id,id,cartItemData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:5000/api/cartitems/${user_id}/${id}`, cartItemData); // Gửi POST request
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Lỗi không xác định khi thêm vào giỏ hàng");
  }
};

