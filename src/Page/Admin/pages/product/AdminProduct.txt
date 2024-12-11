import React from 'react';
import './AdminProduct.scss';

const AdminProduct = () => {
	return (
		<div className="admin-product-container">
			<header className="product-header">
				<h2 className="header-title">Sản phẩm</h2>
			</header>

			<div className="search-container">
				<input
					type="text"
					className="search-input"
					placeholder="Tìm kiếm sản phẩm..."
				/>
				<button className="search-button">Tìm kiếm</button>
			</div>

			<div className="product-list">
				<div className="product-card">
					<img
						src="https://cdn.tgdd.vn/Products/Images/42/329135/s16/iphone-16-xanh-la-650x650.png"
						alt="Product"
						className="product-image"
					/>
					<div className="product-info">
						<p className="product-name">2BAR BABY TEE - BLUE</p>
						<p className="product-price">260.000 VNĐ</p>
						<p className="product-category">Danh mục: Áo</p>
						<p className="product-availability">Tình trạng: 100</p>
					</div>
				</div>
				<div className="product-card">
					<img
						src="https://cdn.tgdd.vn/Products/Images/42/329135/s16/iphone-16-xanh-la-650x650.png"
						alt="Product"
						className="product-image"
					/>
					<div className="product-info">
						<p className="product-name">2BAR BABY TEE - BLUE</p>
						<p className="product-price">260.000 VNĐ</p>
						<p className="product-category">Danh mục: Áo</p>
						<p className="product-availability">Tình trạng: 100</p>
					</div>
				</div>
				<div className="product-card">
					<img
						src="https://cdn.tgdd.vn/Products/Images/42/329135/s16/iphone-16-xanh-la-650x650.png"
						alt="Product"
						className="product-image"
					/>
					<div className="product-info">
						<p className="product-name">2BAR BABY TEE - BLUE</p>
						<p className="product-price">260.000 VNĐ</p>
						<p className="product-category">Danh mục: Áo</p>
						<p className="product-availability">Tình trạng: 100</p>
					</div>
				</div>
				<div className="product-card">
					<img
						src="https://cdn.tgdd.vn/Products/Images/42/329135/s16/iphone-16-xanh-la-650x650.png"
						alt="Product"
						className="product-image"
					/>
					<div className="product-info">
						<p className="product-name">2BAR BABY TEE - BLUE</p>
						<p className="product-price">260.000 VNĐ</p>
						<p className="product-category">Danh mục: Áo</p>
						<p className="product-availability">Tình trạng: 100</p>
					</div>
				</div>
				<div className="product-card">
					<img
						src="https://cdn.tgdd.vn/Products/Images/42/329135/s16/iphone-16-xanh-la-650x650.png"
						alt="Product"
						className="product-image"
					/>
					<div className="product-info">
						<p className="product-name">2BAR BABY TEE - BLUE</p>
						<p className="product-price">260.000 VNĐ</p>
						<p className="product-category">Danh mục: Áo</p>
						<p className="product-availability">Tình trạng: 100</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminProduct;
