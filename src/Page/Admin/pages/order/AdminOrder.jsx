import React from 'react';
import './AdminOrder.scss';

const AdminOrder = () => {
	return (
		<div className=''>
			<div className="home-title">Trang chủ</div>
			<div className="order-container">
				<p className="order-title">Đơn hàng gần đây</p>
				<div className="order-item">
					<img
						className="order-image"
						src="https://i.pinimg.com/1200x/55/0f/49/550f49a459548599a5a4ea1c67fc0244.jpg"
						alt="Order"
					/>
					<div className="order-info">
						<div className="order-name">24 TEE-RED</div>
						<div>
							purchase Date : <span className="order-date">20/08/2024</span>
						</div>
						<div>
							Note :{' '}
							<span className="order-note">Giao hàng trước 3h chiều</span>
						</div>
						<div>
							Price : <span className="order-price">550000 VNĐ</span>
						</div>
						<div className="order-client">
							Client : <span className="client-name">Thùy Dương</span>{' '}
							<span className="client-email">duongnguyen@gmail.com</span>{' '}
							<span className="client-phone">0987654321</span>
						</div>
					</div>
				</div>

				<div className="order-item">
					<img
						className="order-image"
						src="https://i.pinimg.com/1200x/55/0f/49/550f49a459548599a5a4ea1c67fc0244.jpg"
						alt="Order"
					/>
					<div className="order-info">
						<div className="order-name">24 TEE-RED</div>
						<div>
							purchase Date : <span className="order-date">20/08/2024</span>
						</div>
						<div>
							Note :{' '}
							<span className="order-note">Giao hàng trước 3h chiều</span>
						</div>
						<div>
							Price : <span className="order-price">550000 VNĐ</span>
						</div>
						<div className="order-client">
							Client : <span className="client-name">Thùy Dương</span>{' '}
							<span className="client-email">duongnguyen@gmail.com</span>{' '}
							<span className="client-phone">0987654321</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminOrder;
