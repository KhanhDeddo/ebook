import React, { useEffect, useState } from "react";
import "./cart.scss";
import { fetchListCart } from "../../Api/getCart"; // Giả sử fetchListCart trả về dữ liệu giỏ hàng
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../../Api/getListBook";
import { NavBar } from "../../Components/Navbar/navbar";
import { createOrder } from "../../Api/createOrder";
import { createCartItem } from "../../Api/createCartItem";
import { createOrderItem } from "../../Api/createOrderItem";
import { fetcOrders } from "../../Api/getListOrder";

export const CartPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [listCartItem, setListCartItem] = useState([]);
  const [error, setError] = useState(null); // State xử lý lỗi
  const [selectAll, setSelectAll] = useState(false); // State cho checkbox "chọn tất cả"
  const [selectedBookIds, setSelectedBookIds] = useState([]); // State cho các book_id được chọn
  const [listBook, setListBook] = useState([]); // State cho các book_id được chọn
  const [payment,setPayment] = useState(false);
  const [listOrder,setListOrder] = useState([]);
 
  // Tính tổng tiền
  const total = selectedBookIds.reduce(
    (sum, item) => sum + Number(item.price_at_purchase),
    0
  );

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
      // alert(`Item with id ${book_id} deleted successfully!`);

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
      setSelectedBookIds(listCartItem.map((item) => item));
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
  useEffect(() => {
    if (user) {
        const loadDataOrders = async () => {
            try {
                const data = await fetcOrders(user.user_id);
                setListOrder(data);
            } catch (err) {
                console.error(err);
            }
        };
        loadDataOrders();
    }
}, [user]);
  const [order, setOrder] = useState({});
  useEffect(() => {
    if (user) {
      setOrder({
        user_id : user.user_id,
        recipient_name: user.user_name || "",
        recipient_email: user.user_email || "",
        recipient_phone: user.user_phone || "",
        shipping_address: user.user_address || "",
        payment_method: "",
        total_price: total,
      });
    }
  }, [user,total]);
  
   
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  const findBookById = (book_id) => {
    return listBook.find((book) => book.id === book_id);
  };
  const handConfirm = async () => {
    try {
        // Gửi yêu cầu POST tới API để thêm CartItem
        await createOrder(order);
        alert("Đơn hàng được đặt thành công.")
        selectedBookIds.map((item) => {
          //(order_id,book_id,quantity,price_per_item,total_price)
          const book = {
            order_id: listOrder.length+1,
            book_id: item.book_id,
            quantity: item.quantity,
            price_per_item: item.price_at_purchase/item.quantity,
            total_price: item.price_at_purchase,
            };
          console.log(book)          
          createOrderItem(book);
          deleteCartItem(item.cart_id,item.book_id)
          return(<></>)
        })
        selectedBookIds.map((item) => {
          deleteCartItem(item.cart_id,item.book_id)
          return(<></>)
        })
        
        setPayment(false)
    } catch (error) {
      alert(`Lỗi khi thêm vào giỏ hàng: ${error.message}`);
      console.error("Lỗi thêm vào giỏ hàng:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handConfirm();
    console.log('Form Data:',order);
  };
  return (
    <div className="container">
      <NavBar name ="Giỏ hàng"/>
      {user?
      <div>
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
                          <button>+</button>
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
                          {book.stock_quantity>0?
                            <input
                            type="checkbox"
                            checked={selectedBookIds.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          />:<div></div>
                          }
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
            <p>Thành tiền:{total}.000VND</p>
          </div>
          <div className="b">
            {selectedBookIds.length>0?
             <button onClick={() => setPayment(true)}>Đặt hàng</button>
             :<button>Đặt hàng</button>
            }
          </div>
        </div>
      </div>
      {/* Modal cập nhật thông tin */}
      {payment && (
                    <div className="payment">
                        <div className="modal-content">
                            <div className="row">
                              <div className="col-lg-6">
                                <h3>Danh sách mặt hàng</h3>
                                <div>
                                  {selectedBookIds.map((item) => {
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
                                        <div className="row cart-item-order">
                                            <div className="col-lg-24 ">
                                              <img src={book.image_url} alt={book.title} className="image-book" />
                                            </div>
                                            <div className="col-lg-24">
                                              <p>{book.title}</p>
                                            </div>
                                            <div className="col-lg-24">
                                              <p>{book.price}</p>
                                            </div>
                                            <div className="col-lg-24">
                                              <p>{item.quantity}</p>
                                            </div>
                                            <div className="col-lg-24">
                                              <p>{item.price_at_purchase}</p>
                                            </div>
                                          </div>
                                      </div>
                                    );
                                  })}
                              </div>
                              </div>
                              <div className="col-lg-6">
                                <h3>Thông tin đặt hàng</h3>
                                <form>
                                    <label>
                                        Tên người nhận:
                                        <input
                                            type="text"
                                            name="recipient_name"
                                            value={order.recipient_name || ""}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        Email người nhận:
                                        <input
                                            type="email"
                                            name="recipient_email"
                                            value={order.recipient_email || ""}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        Số điện thoại người nhận:
                                        <input
                                            type="text"
                                            name="recipient_phone"
                                            value={order.recipient_phone || ""}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        Địa chỉ nhận hàng:
                                        <input
                                            type="text"
                                            name="shipping_address"
                                            value={order.shipping_address || ""}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                      Phương thức thanh toán:
                                      <div className="methods-payment">
                                        <div></div>
                                        <div>
                                          <input
                                            type="radio"
                                            name="payment_method"
                                            value={"Thanh toán khi nhận hàng"}
                                            onChange={handleInputChange}
                                            checked = {order.payment_method === "Thanh toán khi nhận hàng"}
                                            required
                                          />
                                          <label>Thanh toán khi nhận hàng</label>
                                        </div>
                                      </div>
                                    </label>
                                    <label>
                                        <h4>Tổng tiền: {total}.000VND</h4>
                                    </label>
                                    <div className="modal-actions">
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={() => setPayment(false)}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="button"
                                            className="ok-button"
                                            onClick={handleSubmit}
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                )}
        </div>
        :<div>
          Vui lòng đăng nhập để thực hiện chức năng này....
        </div>
      }
    </div>
  );
};  
