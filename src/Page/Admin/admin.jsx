import React, { useEffect, useState } from 'react';
import './admin.scss';
import { IoMdCart } from 'react-icons/io';
import {  getDashboard, getOrderRecent, getUserRecent } from '../../Api/apiAdmin';

export const AdminHome = () => {
	const [dashboard, setDashboard] = useState(null);
    const [listUserRecent,setlistUserRecent] = useState([]);
    const [listOrderRecent,setlistOrderRecent] = useState([]);

	useEffect(() => {
		const loadDashboard = async () => {
			const data = await getDashboard();
			setDashboard(data);
		};
		loadDashboard();
	  }, []);

	useEffect(()=>{
		const loadDataUser = async() => {
			const data = await getUserRecent();
			setlistUserRecent(data)
		};
		loadDataUser();
    }, [])

	useEffect(()=>{
		const loadDataOrders = async() => {
			const data = await getOrderRecent();
			setlistOrderRecent(data)
		};
		loadDataOrders();
    }, [])

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}


	return (
		<div className="admin-home-container">
			<header className="admin-header-home">
				<h1 className="header-title">Tổng quan</h1>
			</header>

			<div className="stats-container">
				<div className="stats-card">
					<h3>Tổng đơn hàng</h3>
					<p className="stats-value">{dashboard?.order}</p>
				</div>
				<div className="stats-card">
					<h3>Tổng số sản phẩm</h3>
					<p className="stats-value">{dashboard?.item}</p>
				</div>
				<div className="stats-card">
					<h3>Tổng người dùng</h3>
					<p className="stats-value">{dashboard?.user}</p>
				</div>
				<div className="stats-card">
					<h3>Tổng loại sản phẩm</h3>
					<p className="stats-value">{dashboard?.book}</p>
				</div>
			</div>

			<div className="home-info-container">
				<div className="recent-customer">
					<h2>Khách hàng gần đây</h2>
					{listUserRecent.map((user,key_user)=>{
                                    return(
                                        <div className="customer-item" key={key_user}>
											<span className="customer-name">{user.user_name}</span>
											<span className="customer-email">Email : {user.user_email}</span>
											<span className="customer-email">Phone : {user.user_phone}</span>
										</div>
                                    )
                                })
					}
				</div>
				<div className="recent-order">
					<h2>Đơn hàng gần đây</h2>
					{listOrderRecent.map((order, key_order)=>{
                                    return(
                                        <div className="order-item-home" key={key_order}>
											<div className="order-icon">
												<IoMdCart size={'30px'} />
											</div>
											<div className="order-info-wrapper">
												<div className="order-name-home">{order.recipient_name}</div>
												<div className="order-info-home">
													<span className="order-status-home">{order.status}</span>
													<span className="order-id-home">Order #{order.order_id}</span>
													<span className="order-date-home">Date: {formatDate(order.created_at)}</span>
													<span className="order-price-home">Price: {order.total_price} đ</span>
												</div>
											</div>
										</div>
                                    )
                                })
					}
				</div>
			</div>
		</div>
	);
};
