export const fetchBookDetails = async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/books/${id}`); // Thay bằng URL thực tế
    if (!response.ok) {
      throw new Error("Không thể tải chi tiết sách");
    }
    const data = await response.json();
    return data;
  };
  