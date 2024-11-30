import React, { useEffect, useState } from "react";
import "./cart.scss";
import { fetchListCart } from "../../Api/getCart"; // Giả sử fetchListCart trả về dữ liệu giỏ hàng
import { useLocation } from "react-router-dom";

export const CartPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [listCartItem, setListCartItem] = useState([]);
  const [error, setError] = useState(null); // State xử lý lỗi
  const [selectAll, setSelectAll] = useState(false); // State cho checkbox "chọn tất cả"
  const [selectedBookIds, setSelectedBookIds] = useState([]); // State cho các book_id được chọn

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      const loadListCart = async () => {
        try {
          const data = await fetchListCart(user.user_id); // Gọi API lấy dữ liệu giỏ hàng
          setListCartItem(data);
        } catch (err) {
          setError(err.message); // Xử lý lỗi nếu API thất bại
        }
      };
      loadListCart();
    }
  }, [user]);

  const deleteCartItem = async (cart_id, book_id) => {
    const apiUrl = `http://127.0.0.1:5000/api/cartitems/${cart_id}/${book_id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item with id ${book_id}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Delete successful:", result);
      alert(`Item with id ${book_id} deleted successfully!`);

      // Cập nhật danh sách giỏ hàng bằng cách loại bỏ item vừa xóa
      setListCartItem((prevList) =>
        prevList.filter((item) => item.book_id !== book_id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  // Xử lý checkbox "chọn tất cả"
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedBookIds(listCartItem.map((item) => item.book_id));
    } else {
      setSelectedBookIds([]);
    }
  };

  // Xử lý checkbox cho từng mục
  const handleCheckboxChange = (book_id) => {
    setSelectedBookIds((prevSelected) =>
      prevSelected.includes(book_id)
        ? prevSelected.filter((id) => id !== book_id)
        : [...prevSelected, book_id]
    );
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Giỏ hàng của bạn</h2>
      <div className="row">
        <div className="col-lg-9">
          <div className="row haha">
            <div className="col-lg-15">
              <p>Ảnh</p>
            </div>
            <div className="col-lg-15">
              <p>Tên sản phẩm</p>
            </div>
            <div className="col-lg-15">
              <p>Giá</p>
            </div>
            <div className="col-lg-15">
              <p>Số lượng</p>
            </div>
            <div className="col-lg-15">
              <p>Thành tiền</p>
            </div>
            <div className="col-lg-15">
              <p>Trạng thái</p>
            </div>
            <div className="col-lg-15">
              <p>Ngày Thêm</p>
            </div>
            <div className="col-lg-15 hmmm">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </div>
          </div>
          {listCartItem.length === 0 ? (
            <p>Giỏ hàng của bạn hiện đang trống.</p>
          ) : (
            <div className="cart-items">
              {listCartItem.map((item) => (
                <div key={item.book_id} className="cart-item">
                  <div className="">
                    <div className="row haha">
                      <div className="col-lg-15">
                        <image>ảnh</image>
                      </div>
                      <div className="col-lg-15">
                        <p>Toán</p>
                      </div>
                      <div className="col-lg-15">
                        <p>{item.price_at_purchase} VND</p>
                      </div>
                      <div className="col-lg-15">
                        <p>{item.quantity}</p>
                      </div>
                      <div className="col-lg-15">
                        <p>{item.price_at_purchase} VND</p>
                      </div>
                      <div className="col-lg-15">
                        <p>còn hàng</p>
                      </div>
                      <div className="col-lg-15">
                        <p>{new Date(item.added_at).toLocaleString()}</p>
                      </div>
                      <div className="col-lg-15 hmmm">
                        <button
                          onClick={() => deleteCartItem(item.cart_id, item.book_id)}
                        >
                          Xóa
                        </button>
                        <input
                          type="checkbox"
                          checked={selectedBookIds.includes(item.book_id)}
                          onChange={() => handleCheckboxChange(item.book_id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-3 control">
          <div>
            <p>Số lượng: {selectedBookIds.length}</p>
            <p>Thành tiền:</p>
          </div>
          <div className="b">
            <button>Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
