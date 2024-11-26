import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate để chuyển hướng
import { fetchUsers } from "../../Api/user"; // Import hàm API
import "./login.scss";
import { ROUTER } from "../../Utils/router";

const LoginPage = () => {
  const [users, setUsers] = useState([]); // Danh sách user từ API
  const [error, setError] = useState(null); // Lỗi API
  const [formError, setFormError] = useState(""); // Lỗi đăng nhập
  const [formData, setFormData] = useState({ username: "", password: "" }); // Dữ liệu form
  const navigate = useNavigate(); // Hook để chuyển hướng

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadUsers();
  }, []);

  // Xử lý thay đổi dữ liệu trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin đăng nhập
    const user = users.find(
      (u) => u.email === formData.username && u.password === formData.password
    );

    if (user) {
      // Đăng nhập thành công
      localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user vào localStorage
      // navigate(ROUTER.USER.HOME); // Chuyển hướng đến trang Home
      user.user_is_admin?navigate(ROUTER.ADMIN.HOME):navigate(ROUTER.USER.HOME)
      
    } else {
      // Đăng nhập thất bại
      setFormError("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
  };

  // return (
  //   <div className="bodylogin">
  //     <div className="login-container">
  //       <div className="login-image">
  //         <img
  //           src="https://i.pinimg.com/564x/ad/27/17/ad27177ac341711d46a19fe60db109d1.jpg"
  //           alt="Books"
  //         />
  //       </div>
  //       <div className="login-form">
  //         <h2 className="login-title">
  //           <Link to="/">Ebook</Link>
  //         </h2>
  //         <h3>Đăng nhập</h3>
  //         <form onSubmit={handleSubmit}>
  //           <label htmlFor="username">Tài khoản *</label>
  //           <input
  //             type="text"
  //             id="username"
  //             name="username"
  //             placeholder="Nhập tài khoản"
  //             value={formData.username}
  //             onChange={handleInputChange}
  //             required
  //           />

  //           <label htmlFor="password">Mật khẩu *</label>
  //           <input
  //             type="password"
  //             id="password"
  //             name="password"
  //             placeholder="Nhập mật khẩu"
  //             value={formData.password}
  //             onChange={handleInputChange}
  //             required
  //           />

  //           <div className="login-options">
  //             <a href="#forgot-password" className="forgot-password">
  //               Quên mật khẩu?
  //             </a>
  //           </div>
  //           {error && <p className="error-message">Lỗi: {error}</p>}
  //           {formError && <span className="error-message">{formError}</span>} {/*Hiển thị lỗi đăng nhập*/}
  //           <button type="submit" className="login-button">
  //             Đăng nhập
  //           </button>
  //         </form>

  //         <div className="social-login">
  //           <p>Hoặc đăng nhập bằng:</p>
  //           <button className="google-button">Sign in with Google</button>
  //           <button className="facebook-button">Continue with Facebook</button>
  //         </div>

  //         <p className="register-link">
  //           Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="bodylogin">
      <div className="login-container">
        <div className="login-image">
          <img
            src="https://i.pinimg.com/564x/ad/27/17/ad27177ac341711d46a19fe60db109d1.jpg"
            alt="Books"
          />
        </div>
        <div className="login-form">
          <h2 className="login-title">
            <Link to="/">Ebook</Link>
          </h2>
          <h3>Đăng nhập</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Tài khoản *</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tài khoản"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
  
            <label htmlFor="password">Mật khẩu *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
  
            <div className="login-options">
              <a href="#forgot-password" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>
            {error && <p className="error-message">Lỗi: {error}</p>}
            {formError && <span className="error-message">{formError}</span>} {/* Hiển thị lỗi đăng nhập */}
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
  
          <div className="social-login">
            <p>Hoặc đăng nhập bằng:</p>
            <button className="google-button">Sign in with Google</button>
            <button className="facebook-button">Continue with Facebook</button>
          </div>
  
          <p className="register-link">
            Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link>
          </p>
        </div>
        {/* Hiển thị danh sách tài khoản và mật khẩu */}
        {/* <div className="user-list">
          <h4>Danh sách tài khoản (Chỉ dùng để kiểm tra):</h4>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>Tài khoản:</strong> {user.user_name}, <strong>Mật khẩu:</strong> {user.user_password}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
  
};

export default LoginPage;
