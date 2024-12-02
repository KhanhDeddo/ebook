import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBookDetails } from "../../Api/getBook";
import { NavBar } from "../../Components/Navbar/navbar";
import "./productDetails.scss";
import Carousel from "react-multi-carousel";
import { fetchBooks } from "../../Api/getListBook";
import { CardBook } from "../../Components/Card/card";
import { createCartItem } from "../../Api/createCartItem";
import { fetchCartItem } from "../../Api/getCartItem";
import { updateCartItem } from "../../Api/updateCartItem";


const BookDetails = ({ onCartUpdated }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [books, setBooks] = useState([]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [location]);

  // Gọi API lấy danh sách sách
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    loadBooks();
  }, []);

  // Gọi API lấy chi tiết sách
  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
        setIsOutOfStock(data.stock_quantity === 0);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    };
    loadBookDetails();
  }, [id]);

  // Kiểm tra sách có trong giỏ hàng
  const checkBookInCart = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/cartitems/check/${user.user_id}/${id}`
      );
      if (response.ok) {
        const cartData = await fetchCartItem(user.user_id, id);
        setCartItem(cartData);
      } else {
        setCartItem(null);
      }
    } catch (error) {
      console.error("Error checking cart item:", error);
    }
  }, [user, id]);

  useEffect(() => {
    checkBookInCart();
  }, [checkBookInCart]);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  // Tính tổng tiền
  const totalPrice = (parseFloat(book?.price || 0) * quantity).toFixed(2);

  // Thêm hoặc cập nhật sách trong giỏ hàng
  const handleAddCartAction = async () => {
    if (isOutOfStock) {
      alert("Sản phẩm đã hết hàng và không thể thêm vào giỏ hàng.");
      return;
    }
    if (!user) {
      alert("Bạn chưa đăng nhập, vui lòng đăng nhập!");
      return;
    }

    try {
      if (cartItem) {
        const updatedData = {
          quantity: cartItem.quantity + quantity,
          price_at_purchase: cartItem.price_at_purchase + book.price * quantity,
        };
        await updateCartItem(user.user_id, id, updatedData);
        alert(`Đã cập nhật ${book.title} trong giỏ hàng!`);
      } else {
        const newCartItem = {
          cart_id: user.user_id,
          book_id: book.id,
          quantity,
          price_at_purchase: book.price * quantity,
        };
        await createCartItem(newCartItem);
        if (onCartUpdated) {
          onCartUpdated();
        }
        alert(`Đã thêm ${book.title} vào giỏ hàng!`);
      }
      checkBookInCart();
    } catch (error) {
      console.error("Error handling cart action:", error);
      alert("Lỗi khi xử lý giỏ hàng. Vui lòng thử lại.");
    }
  };

  // Mua ngay
  const handleBuyAction = () => {
    if (isOutOfStock) {
      alert("Sản phẩm đã hết hàng và không thể mua.");
    } else if (!user) {
      alert("Bạn chưa đăng nhập, vui lòng đăng nhập!");
    } else {
      alert(`Đã mua ${book.title} thành công!`);
    }
  };

  // Responsive setting cho Carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  if (!book) return <div>Đang tải chi tiết sách...</div>;
  const handleSimilarBookClick = (bookId) => {
    setQuantity(1); // Reset số lượng về 1
    // setError(null); // Reset lỗi (nếu cần)
    // setBook(null); // Reset thông tin sách hiện tại
    // Điều hướng tới URL của sách tương tự
    // window.location.href = `/book-details/${bookId}`;
  };
  

  return (
    <div className="container">
      <NavBar name={"Sản phẩm chi tiết"} search={book.title} />
      <div className="book-details">
        <div className="row">
          <div className="col-lg-3">
            <img src={book.image_url} alt={book.title} className="book-image" />
          </div>
          <div className="col-lg-6">
            <div className="book-infor">
              <h1>{book.title}</h1>
              <p>Thể loại: {book.category}</p>
              <p>Tác giả: {book.author}</p>
              <p>Nhà xuất bản: {book.publisher}</p>
              <p>Giá: {book.price} VND</p>
              <p>Ngày xuất bản: {new Date(book.publication_date).toLocaleDateString()}</p>
              <p>Nhà xuất bản: {book.publisher}</p>
              <p>
                  Số lượng:
                  <span className={book.stock_quantity > 0 ? "" : "het-hang"}>
                    {book.stock_quantity}
                  </span>
              </p>
              <p>
                  Trạng thái:
                  {book.stock_quantity > 0 ? (
                    <span>Còn hàng</span>
                  ) : (
                    <span className="het-hang">Hết hàng</span>
                  )}
                </p>
                <p>Mô tả sách: {book.description}</p>
            </div>
          </div>
          <div className="col-lg-3 pricing">
            <div className="quantity-control">
              <span>Số lượng: </span>
              <div className="input-button">
              <button onClick={() => handleQuantityChange("decrement")}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange("increment")}>+</button>
              </div>
            </div>
            <div>
              <span>Tổng tiền: </span>
              <span className="total-price">{totalPrice}0 VND</span>
            </div>
            <div className="actions">
              <button className="add-to-cart" onClick={handleAddCartAction}>
                Thêm vào giỏ hàng
              </button>
              <button className="buy-now" onClick={handleBuyAction}>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-books">
        <h2>Sản phẩm tương tự</h2>
        <Carousel responsive={responsive}>
  {books.map((book) => (
    <div
      key={book.id}
      onClick={() => handleSimilarBookClick(book.id)}
      style={{ cursor: "pointer" }}
    >
      <CardBook
        id={book.id}
        title={book.title}
        image={book.image_url}
        price={book.price}
        width={150}
        height={290}
        sizef={14}
      />
    </div>
  ))}
</Carousel>

      </div>
    </div>
  );
};

export default BookDetails;
