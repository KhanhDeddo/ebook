import React from 'react';
import './Sidebar.scss';
import { IoMdHome } from 'react-icons/io';
import { IoCart } from 'react-icons/io5';
import { IoIosWallet } from 'react-icons/io';
import { IoBagCheck } from 'react-icons/io5';
import { MdLibraryAdd } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
	const { pathname } = useLocation();
	console.log('🚀 ~ Sidebar ~ location:', pathname, pathname === '/admin');

	const sidebarItem = [
		{
			id: 1,
			title: 'Trang chủ',
			icon: <IoMdHome />,
			link: '/admin',
		},
		{
			id: 2,
			title: 'Đơn hàng',
			icon: <IoCart />,
			link: '/admin/order',
		},
		{
			id: 3,
			title: 'Ví',
			icon: <IoIosWallet />,
			link: '/admin/wallet',
		},
		{
			id: 4,
			title: 'Sản phẩm',
			icon: <IoBagCheck />,
			link: '/admin/product',
		},
		{
			id: 5,
			title: 'Thêm sản phẩm',
			icon: <MdLibraryAdd />,
			link: '/admin/add-product',
		},
		{
			id: 6,
			title: 'Hồ sơ của tôi',
			icon: <FaUser />,
			link: '/admin/profile',
		},
	];

	return (
		<div className="sidebars">
			<ul className="sidebar-menu">
				{sidebarItem.map((item) => (
					<NavLink
						to={item.link}
						className={({ isActive }) =>
							isActive ? 'sidebar-item active' : 'sidebar-item'
						}
						end={item.link === '/admin'}
					>
						<div className="sidebar-item-icon">{item.icon}</div>
						<div className="sidebar-item-title">{item.title}</div>
					</NavLink>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
