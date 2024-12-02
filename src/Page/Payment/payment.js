import React from "react";
import "./pyament.scss"
import { NavBar } from "../../Components/Navbar/navbar";
export const PaymentPage = () => {
    return(
        <div className="container">
            <NavBar name = "Thanh toán"/>
            <div className="row">
                <div className="col-lg-6">1</div>
                <div className="col-lg-6 infor">
                    <h3>Thông tin nhận hàng</h3>
                </div>
                
            </div>
        </div>
    )
}