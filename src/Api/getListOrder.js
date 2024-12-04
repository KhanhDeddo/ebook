import axios from 'axios';
// Hàm lấy danh sách user
export const fetcOrders = async (user_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/orders/${user_id}`); // Gọi tới Flask backend
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
