import React from 'react';
import './admin.scss';
import { IoMdCart } from 'react-icons/io';

export const AdminHome = () => {
	return (
		<div className="admin-home-container">
			<header className="admin-header-home">
				<h1 className="header-title">Tổng quan</h1>
			</header>

			<div className="stats-container">
				<div className="stats-card">
					<h3>Tổng đơn hàng</h3>
					<p className="stats-value">1,500</p>
				</div>
				<div className="stats-card">
					<h3>Tổng sản phẩm</h3>
					<p className="stats-value">350</p>
				</div>
				<div className="stats-card">
					<h3>Tổng người dùng</h3>
					<p className="stats-value">1,200</p>
				</div>
				<div className="stats-card">
					<h3>Danh mục sản phẩm</h3>
					<p className="stats-value">1,200</p>
				</div>
			</div>

			<div className="home-info-container">
				<div className="recent-customer">
					<h2>Khách hàng gần đây</h2>
					<div className="customer-item">
						<span className="customer-name">Thùy Dương</span>
						<span className="customer-email">Email : thuyduong@gmail.com</span>
						<span className="customer-email">Phone : 0987654321</span>
					</div>
					<div className="customer-item">
						<span className="customer-name">Thùy Dương</span>
						<span className="customer-email">Email : thuyduong@gmail.com</span>
						<span className="customer-email">Phone : 0987654321</span>
					</div>
					<div className="customer-item">
						<span className="customer-name">Thùy Dương</span>
						<span className="customer-email">Email : thuyduong@gmail.com</span>
						<span className="customer-email">Phone : 0987654321</span>
					</div>
				</div>
				<div className="recent-order">
					<h2>Đơn hàng gần đây</h2>
					<div className="order-item-home">
						<div className="order-icon">
							<IoMdCart size={'30px'} />
						</div>
						<div className="order-info-wrapper">
							<div className="order-name-home">Thùy Dương</div>
							<div className="order-info-home">
								<span className="order-status-home">Payment on delivery</span>
								<span className="order-id-home">Order #11</span>
								<span className="order-date-home">Date: 21/09/2024</span>
								<span className="order-price-home">Price: 27800000</span>
							</div>
						</div>
					</div>
					<div className="order-item-home">
						<div className="order-icon">
							<IoMdCart size={'30px'} />
						</div>
						<div className="order-info-wrapper">
							<div className="order-name-home">Thùy Dương</div>
							<div className="order-info-home">
								<span className="order-status-home">Payment on delivery</span>
								<span className="order-id-home">Order #11</span>
								<span className="order-date-home">Date: 21/09/2024</span>
								<span className="order-price-home">Price: 27800000</span>
							</div>
						</div>
					</div>
					<div className="order-item-home">
						<div className="order-icon">
							<IoMdCart size={'30px'} />
						</div>
						<div className="order-info-wrapper">
							<div className="order-name-home">Thùy Dương</div>
							<div className="order-info-home">
								<span className="order-status-home">Payment on delivery</span>
								<span className="order-id-home">Order #11</span>
								<span className="order-date-home">Date: 21/09/2024</span>
								<span className="order-price-home">Price: 27800000</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
