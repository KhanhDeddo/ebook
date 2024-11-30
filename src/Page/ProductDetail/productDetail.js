import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBookDetails } from "../../Api/bookdetail"; // API lấy chi tiết sách
import { NavBar } from "../../Components/Navbar/navbar";
import "./productDetails.scss";
import Carousel from "react-multi-carousel";
import { fetchBooks } from "../../Api/book";
import { CardBook } from "../../Components/Card/card";
import { addToCart } from "../../Api/addToCart";

const BookDetails = () => {
  const { id } = useParams(); // Lấy ID sách từ URL
  const [book, setBook] = useState(null); // Lưu thông tin sách
  const [error, setError] = useState(null); // Lưu thông báo lỗi
  const [quantity, setQuantity] = useState(1); // Số lượng mua sách
  const [books, setBooks] = useState([]); // State lưu danh sách sách
  const [isOutOfStock, setIsOutOfStock] = useState(false); // Trạng thái hết hàng

  const location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
    }
  }, [location]);
  // Lấy danh sách sách
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(); // Gọi API lấy dữ liệu sách
        setBooks(data);
      } catch (err) {
        setError(err.message); // Xử lý lỗi nếu API thất bại
      }
    };
    loadBooks();
  }, []);

  // Responsive setting cho Carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  // Lấy chi tiết sách
  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        const data = await fetchBookDetails(id); // Gọi API lấy chi tiết sách
        setBook(data);
        setIsOutOfStock(data.stock_quantity === 0); // Cập nhật trạng thái hết hàng khi dữ liệu tải xong
      } catch (err) {
        setError(err.message);
      }
    };
    loadBookDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">Lỗi: {error}</div>; // Hiển thị lỗi nếu xảy ra
  }
  if (!book) {
    return <div>Đang tải chi tiết sách...</div>; // Hiển thị trạng thái tải
  }

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    setIsOutOfStock(book.stock_quantity === 0); // Cập nhật lại trạng thái hết hàng khi số lượng thay đổi
  };

  // Tính tổng tiền
  const totalPrice = (parseFloat(book.price) * quantity).toFixed(2);

  // Xử lý sự kiện khi người dùng nhấn vào nút "Thêm vào giỏ hàng" hoặc "Mua ngay"
  const handleAddCartAction = async (action) => {
    if (isOutOfStock) {
      alert("Sản phẩm đã hết hàng và không thể thêm vào giỏ hàng.");
      return;
    }
    if (!user) {
      alert("Bạn chưa đăng nhập, vui lòng đăng nhập!");
      return;
    }
    try {
      // Gọi API thêm vào giỏ hàng
      const result = await addToCart(user.id, book.id, quantity);
      alert(`Đã ${action} ${book.title} vào giỏ hàng!`);
      console.log("Kết quả thêm vào giỏ hàng:", result);
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };
  const handleBuyAction = (action) => {
    if (isOutOfStock) {
      alert("Sản phẩm đã hết hàng và không thể mua.");
    } else {
      user? alert(`Đã ${action} ${book.title} thành công !`)
      :alert(`Bạn chưa đăng nhập, vui lòng đăng nhập !`);
    }
  };
  return (
    <>
      <div className="container">
        <NavBar name={"Sản phẩm chi tiết"} search={book.title}/>
        <div className="book-details">
          <div className="row">
            <div className="col-lg-3">
              <img src={book.image_url} alt={book.title} className="book-image" />
            </div>
            <div className="col-lg-6">
              <div className="book-infor">
                <h1>{book.title}</h1>
                <p>Thể loại: {book.category}</p>
                <p>Lớp: {book.level_class}</p>
                <p>Trường: {book.level_school}</p>
                <p>Tác giả: {book.author}</p>
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
              <div>
                <span>Giá: </span>
                <span className="current-price">{book.price} VND</span>
              </div>
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
                <span className="total-price">{totalPrice} VND</span>
              </div>
              <div className="actions">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddCartAction("Thêm vào giỏ hàng")}
                  // disabled={isOutOfStock}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="buy-now"
                  onClick={() => handleBuyAction("Mua ngay")}
                  // disabled={isOutOfStock}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="">
          <div className="col-lg-12">
            <h2 className="title-render">Sản phẩm tương tự</h2>
          </div>
          <div className="col-lg-12 render">
            <Carousel responsive={responsive}>
              {books.map((book) => (
                <CardBook
                  key={book.id} // ID sách
                  id={book.id}
                  title={book.title}
                  image={book.image_url}
                  price={book.price}
                  width={150}
                  height={290}
                  sizef={14}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
