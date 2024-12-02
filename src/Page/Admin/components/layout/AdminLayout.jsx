// import React from 'react';
// import AdminHeader from '../header/AdminHeader';
// import Sidebar from '../sidebar/Sidebar';
// import { Outlet } from 'react-router-dom';
// import './AdminLayout.scss';

// const AdminLayout = () => {
// 	return (
// 		<div className="admin-layout">
// 			<AdminHeader />
// 			<div className="admin-main-content">
// 				<Sidebar />
// 				<div className="admin-content">
// 					<Outlet />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AdminLayout;


import React from 'react';
import AdminHeader from '../header/AdminHeader';
import Sidebar from '../sidebar/Sidebar';
import './AdminLayout.scss';
const AdminLayout = ({ children, ...props }) => {
    return (
        <div {...props}>
            <div className="admin-layout">
				<AdminHeader/>
				<div className="admin-main-content">
					<Sidebar />
					<div className="admin-content">
						{children}
					</div>
				</div>
        </div>
        </div>
    );
};

export default AdminLayout;
