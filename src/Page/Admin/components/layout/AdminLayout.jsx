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
