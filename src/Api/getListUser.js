import axios from 'axios';
// Hàm lấy danh sách user
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
