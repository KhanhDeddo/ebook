import React, { useEffect, useState } from "react";
import "./cart.scss";
import { fetchListCart } from "../../Api/getCart"; // Giả sử fetchListCart trả về dữ liệu giỏ hàng
import { Link, useLocation } from "react-router-dom";
import { fetchBooks } from "../../Api/book";
import { ROUTER } from "../../Utils/router";
import { NavBar } from "../../Components/Navbar/navbar";

export const CartPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [listCartItem, setListCartItem] = useState([]);
  const [error, setError] = useState(null); // State xử lý lỗi
  const [selectAll, setSelectAll] = useState(false); // State cho checkbox "chọn tất cả"
  const [selectedBookIds, setSelectedBookIds] = useState([]); // State cho các book_id được chọn
  const [listBook, setListBook] = useState([]); // State cho các book_id được chọn

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
    }
  }, [location]);
  useEffect(() => {
    if(user){
      const loadListBook = async () => {
        try {
          const data = await fetchBooks(); // Gọi API lấy dữ liệu giỏ hàng
          setListBook(data);
        } catch (err) {
          setError(err.message); // Xử lý lỗi nếu API thất bại
        }
      };
      loadListBook();
    }
  },[user])
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
  const findBookById = (book_id) => {
    return listBook.find((book) => book.id === book_id);
  };
  
  return (
    <div className="container">
      <NavBar name ="Giỏ hàng"/>
      <div className="row">
        <div className="col-lg-9">
          <div className="row cart-title">
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
              <p>Ngày thêm</p>
            </div>
            <div className="col-lg-15 option">
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
            <div>
              {listCartItem.map((item) => {
                const book = findBookById(item.book_id);
                if (!book) {
                  return (
                    <div key={item.book_id}>
                      <p>Không tìm thấy thông tin sách cho ID: {item.book_id}</p>
                    </div>
                  );
                }
                return (
                  <div key={item.book_id}>
                    <div className="row cart-item">
                        <div className="col-lg-15 ">
                          <img src={book.image_url} alt={book.title} className="image-book" />
                        </div>
                        <div className="col-lg-15">
                          <p>{book.title}</p>
                        </div>
                        <div className="col-lg-15">
                          <p>{book.price} VND</p>
                        </div>
                        <div className="col-lg-15 control-quantity">
                          <button>-</button>
                          <p>{item.quantity}</p>
                          <button>-</button>
                        </div>
                        <div className="col-lg-15">
                          <p>{item.price_at_purchase} VND</p>
                        </div>
                        <div className={book.stock_quantity > 0 ? "col-lg-15 con-hang":"col-lg-15 het-hang"}>
                          {book.stock_quantity > 0 ? <p>Còn hàng</p>:<p>Hết hàng</p>}
                        </div>
                        <div className="col-lg-15">
                          <p>{new Date(item.added_at).toLocaleString()}</p>
                        </div>
                        <div className="col-lg-15 option">
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
                );
              })}
            </div>
          )}
        </div>
        <div className="col-lg-3 control">
          <div>
            <p>Số lượng: {selectedBookIds.length}</p>
            <p>Thành tiền:</p>
          </div>
          <div className="b">
            {listCartItem.length>0?
               <Link to={ROUTER.USER.PAYMENT}>
               <button>Đặt hàng</button>
             </Link>
             :<button>Đặt hàng</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};  