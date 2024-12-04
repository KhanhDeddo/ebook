import React, { useEffect, useState } from "react";
import "./orders.scss"
import { NavBar } from "../../Components/Navbar/navbar";
import { useLocation } from "react-router-dom";
import { fetcOrders } from "../../Api/getListOrder";

export const Orders = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [listOrder,setListOrder] = useState([])
    useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy thông tin người dùng từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
    }
    }, [location]);
    useEffect(()=>{
        if(user){
            const loadDataOrders = async() => {
                try{
                    const data = await fetcOrders(user.user_id);
                    setListOrder(data)
                }catch(err){

                }
            };loadDataOrders();console.log(listOrder)
        }
    })
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
                                <div className="col-lg-2">
                                    Mã đơn hàng</div>
                                <div className="col-lg-2">
                                    Ngày đặt đơn</div>
                                <div className="col-lg-2">
                                    Tổng tiền</div>
                                <div className="col-lg-2">
                                    Trạng thái</div>
                                <div className="col-lg-2">
                                    Thông tin người nhận</div>
                                <div className="col-lg-2">
                                    Lựa chọn</div>
                            </div>
                            <div>
                                {listOrder.map((order,key_order)=>{
                                    return(
                                        <div className="order" key={key_order}>
                                            <div className="col-lg-2">
                                                A
                                                {order.user_id}
                                                {order.order_id}
                                                {order.order_id}

                                            </div>
                                            <div className="col-lg-2">{new Date(order.order_date).toLocaleString()}</div>
                                            <div className="col-lg-2">{order.total_price}</div>
                                            <div className="col-lg-2">{order.status}</div>
                                            <div className="col-lg-2">
                                                <div className="infor">
                                                    <p>Tên:{order.recipient_name}, </p>
                                                    <p>SĐT:{order.recipient_phone},</p>
                                                    <p>Email:{order.recipient_email},</p>
                                                    <p>Địa chỉ: {order.shipping_address}</p>
                                                </div>
                                            </div>
                                            {order.status==="Chờ xác nhận" ?
                                                <div className="col-lg-2 cancel-order"><button>Hủy</button></div>
                                                :<div className="col-lg-2 finish-order"><button>Hoàn thành</button></div>
                                            }
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :<div>Vui lòng đăng nhập để thực hiện chức năng này....</div>
            }
        </div>
    )
}