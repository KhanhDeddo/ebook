import React from 'react';
import './AdminHeader.scss';
import { IoIosNotifications } from 'react-icons/io';

const AdminHeader = () => {
	return (
		<header className="admin-header">
			<div className="admin-header__logo"></div>
			<div className="admin-header__actions">
				<IoIosNotifications size={'24px'} />
				<button className="admin-header__button">Thêm sản phẩm</button>
				<button className="admin-header__button">Đăng xuất</button>
			</div>
		</header>
	);
};

export default AdminHeader;
