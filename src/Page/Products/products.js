import React, { useEffect, useState } from "react";
import { NavBar } from "../../Components/Navbar/navbar";
import "./products.scss";
import { fetchBooks } from "../../Api/book";
import { CardBook } from "../../Components/Card/card";
import { useLocation } from "react-router-dom";
import { ROUTER } from "../../Utils/router";

export const Products = () => {
  const [books, setBooks] = useState([]); // State lưu danh sách sách
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.category || "");
  const [minPrice, setMinPrice] = useState(""); // Giá trị "Từ"
  const [maxPrice, setMaxPrice] = useState(""); // Giá trị "Đến"

  useEffect(() => {
    // Cập nhật searchTerm khi location.state thay đổi
    if (location.state?.category) {
      setSearchTerm(location.state.category.toLowerCase());
    }
  }, [location.state]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(); // Gọi API lấy dữ liệu sách
        setBooks(data);
      } catch (err) {
        console.error(err); // Xử lý lỗi nếu API thất bại
      }
    };
    loadBooks();
  }, []);

  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Cập nhật từ khóa tìm kiếm
  };
    // // Lọc các sách theo từ khóa tìm kiếm
    // const filteredBooks = books.filter((book) =>
    //   book.title.toLowerCase().includes(searchTerm)
    // );
  // Lọc các sách theo từ khóa tìm kiếm và mức giá
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPrice =
      (minPrice === "" || book.price >= Number(minPrice)) &&
      (maxPrice === "" || book.price <= Number(maxPrice));
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="container">
      <NavBar name="Danh sách sản phẩm" router={ROUTER.USER.PRODUCTS} search={searchTerm} />
      <div className="row products">
        <div className="col-lg-3">
          <div className="sidebar">
            <div className="sidebar-item">
              <h3>Tìm kiếm</h3>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Tìm sách..."
              />
            </div>
            <div className="sidebar-item">
              <h3>Mức giá</h3>
              <div className="price-range-wrap">
                <div>
                  <p>Từ:</p>
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)} // Lưu giá trị "Từ"
                  />
                </div>
                <div>
                  <p>Đến:</p>
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)} // Lưu giá trị "Đến"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 list-products">
          <div>
            <h1>Danh sách sản phẩm</h1>
          </div>
          <div className="render">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <CardBook
                  key={book.id} // ID sách
                  id={book.id}
                  title={book.title}
                  image={book.image_url}
                  price={book.price}
                  width={149}
                  height={290}
                  sizef={14}
                />
              ))
            ) : (
              <p style={{textAlign:"center"}}>Không có sách nào phù hợp với tìm kiếm của bạn.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
