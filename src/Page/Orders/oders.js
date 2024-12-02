import React, { useEffect, useState } from "react";
import "./orders.scss"
import { NavBar } from "../../Components/Navbar/navbar";
import { useLocation } from "react-router-dom";

export const Orders = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
    }
  }, [location]);
    const menu = [
        {
            name:"Chờ xác nhận",
        },
        {
            name:"Chờ vận chuyển",
        },
        {
            name:"Đang giao",
        },
        {
            name:"Hoàn thành",
        },
        {
            name:"Đã hủy",
        },
    ]
    return(
        <div className="container">
            <NavBar name = "Đơn hàng"/>
            {user?
                <div className="row">
                    <div className="col-lg-3">
                        <div className="navbar-orders">
                            <div className="search-orders">
                                <h3>Tìm kiếm</h3>
                                <input placeholder="Nhập mã đơn hàng"/>
                            </div>
                            <div>
                            <ul>
                                { 
                                    menu.map((item,key_item) => (
                                        <li key={key_item}>{item.name}</li>
                                    ))
                                }
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div>
                            <div className="header-orders">
                                <div>Mã đơn hàng</div>
                                <div>Tổng tiền</div>
                                <div>Trạng thái</div>
                                <div>Lựa chọn</div>
                            </div>
                        </div>
                    </div>
                </div>
                :<div>Vui lòng đăng nhập để thực hiện chức năng này....</div>
            }
        </div>
    )
}