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
            <div className="header-orders">
                <ul>
                    { 
                        menu.map((item,key_item) => (
                            <li key={key_item}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
            {user?
                <div className="card-order">
                    <div className="row">
                        <div className="col-lg-3">image</div>
                        <div className="col-lg-3">name</div>
                        <div className="col-lg-3">price</div>
                        <div className="col-lg-3">huy</div>
                    </div>
                </div>:
                <div>Vui lòng đăng nhập để thực hiện chức năng này....</div>
            }
        </div>
    )
}