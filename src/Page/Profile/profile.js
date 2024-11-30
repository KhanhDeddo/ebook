import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../Utils/router";
import "./profile.scss";
import { NavBar } from "../../Components/Navbar/navbar";
import axios from "axios";

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData(parsedUser); // Đặt dữ liệu mặc định cho form
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate(ROUTER.USER.LOGIN);
    };

    const handleDeleteAccount = async () => {
        if (!user) return;

        try {
            // Gọi API DELETE
            await axios.delete(`http://127.0.0.1:5000/api/users/${user.user_id}`);
            alert("Tài khoản đã được xóa!");
            localStorage.removeItem("user");
            setUser(null);
            navigate(ROUTER.USER.HOME);
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
            alert("Xóa tài khoản thất bại. Vui lòng thử lại.");
        }
    };

    const handleUpdateInfo = async () => {
        if (!user) return;

        try {
            // Gọi API PUT để cập nhật thông tin
            const response = await axios.put(
                `http://127.0.0.1:5000/api/users/${user.user_id}`,
                formData
            );
            alert("Thông tin tài khoản đã được cập nhật!");
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            setIsUpdateModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật tài khoản:", error);
            alert("Cập nhật tài khoản thất bại. Vui lòng thử lại.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <NavBar name="Thông tin tài khoản" />
            <div className="profile-container">
                <div className="profile">
                    <h2>Thông tin tài khoản</h2>
                    {user ? (
                        <div className="profile-details">
                            <div className="profile-section">
                                <span>
                                    <strong>Tên người dùng:</strong> {user.user_name}
                                </span>
                                <span>
                                    <strong>Email:</strong> {user.user_email}
                                </span>
                                <span>
                                    <strong>Số điện thoại:</strong> {user.user_phone}
                                </span>
                            </div>
                            <div className="profile-section">
                                <span>
                                    <strong>Giới tính:</strong> {user.user_gender}
                                </span>
                                <span>
                                    <strong>Ngày sinh:</strong> {user.user_date_of_birth}
                                </span>
                                <span>
                                    <strong>Địa chỉ:</strong> {user.user_address}
                                </span>
                            </div>
                            <div className="profile-actions">
                                <button
                                    className="update-button"
                                    onClick={() => setIsUpdateModalOpen(true)}
                                >
                                    Cập nhật thông tin
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => setIsDeleteConfirmOpen(true)}
                                >
                                    Xóa tài khoản
                                </button>
                                <button className="logout-button" onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="loading-text">Đang tải thông tin...</p>
                    )}
                </div>

                {/* Modal cập nhật thông tin */}
                {isUpdateModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Cập nhật thông tin tài khoản</h3>
                            <form>
                                <label>
                                    Tên người dùng:
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="user_email"
                                        value={formData.user_email || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Số điện thoại:
                                    <input
                                        type="text"
                                        name="user_phone"
                                        value={formData.user_phone || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Giới tính:
                                    <input
                                        type="text"
                                        name="user_gender"
                                        value={formData.user_gender || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Ngày sinh:
                                    <input
                                        type="date"
                                        name="user_date_of_birth"
                                        value={formData.user_date_of_birth || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Địa chỉ:
                                    <input
                                        type="text"
                                        name="user_address"
                                        value={formData.user_address || ""}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="save-button"
                                        onClick={handleUpdateInfo}
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setIsUpdateModalOpen(false)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Xác nhận xóa tài khoản */}
                {isDeleteConfirmOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Bạn có chắc chắn muốn xóa tài khoản?</h3>
                            <div className="modal-actions">
                                <button
                                    className="delete-confirm-button"
                                    onClick={handleDeleteAccount}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => setIsDeleteConfirmOpen(false)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
