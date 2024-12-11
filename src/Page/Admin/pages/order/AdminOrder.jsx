import React, { useEffect, useState } from 'react';
import './AdminOrder.scss';
import DataTable from "react-data-table-component";
import { getOrderDetail, getOrders, updateStatusOrder } from '../../../../Api/apiAdmin';

const AdminOrder = () => {
    const [listData,setlistData] = useState([]);

	const [search, setSearch] = useState('');

	const [keyTable, setkeyTable] = useState(1);

	const [rowSelected, setrowSelected] = useState({});

	const [showPopup, setshowPopup] = useState(false);

	const [orderDetail, setOrderDetail] = useState([]);

	const loadDataGrid = async(value) => {
		const data = await getOrders({"search" : value});
		setlistData(data)
	};

	const CONFIRM_STATUS = "Xác nhận";

	useEffect(()=>{
		loadDataGrid(search);
    }, [])

	const columns = [
		{
		  id: 1,
		  name: "ID",
		  selector: (row) => row.order_id,
		  reorder: true
		},
		{
		  id: 2,
		  name: "Người tạo",
		  selector: (row) => row.user_name,
		  reorder: true
		},
		{
			id: 3,
			name: "Tổng tiền",
			selector: (row) => row.total_price,
			right: true,
			reorder: true
		},
		{
			id: 4,
			name: "Phương thức thanh toán",
			selector: (row) => row.payment_method,
			right: true,
			reorder: true
		},
		{
			id: 5,
			name: "Trạng thái thanh toán",
			selector: (row) => row.payment_status,
			right: true,
			reorder: true
		},
		{
			id: 6,
			name: "Trạng thái đơn",
			selector: (row) => row.status,
			right: true,
			reorder: true
		},
	];

	const paginationComponentOptions = {
		selectAllRowsItem: true,
		selectAllRowsItemText: "ALL"
	};

	const getDetailOrder = async(orderId) => {
		const data = await getOrderDetail(orderId);
		setOrderDetail(data);
	}

	const handleSelected = async (row) => {
		console.log(row);
		setrowSelected(row);
		setshowPopup(true);
		await getDetailOrder(row.order_id)
	}

	const handleSearch = async (e) => {
		console.log(e.target?.value)
		if(e.target.value) {
			await loadDataGrid(e.target.value);
		}else {
			await loadDataGrid('');
		}
		setkeyTable(keyTable + 1);
	}

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const hanldeConfirm = async () => {
		rowSelected.status = CONFIRM_STATUS;
		var data = await updateStatusOrder(rowSelected);
		setshowPopup(false);
		loadDataGrid(search);
		alert("Cập nhật thành công");
		console.log(data);
	}

	return (
		<div className=''>
			<div className="home-title">Đơn hàng</div>
			<div className='header-page'>
				<input placeholder='Tìm kiếm' className='input input-search' onChange={handleSearch} />
			</div>

			<DataTable
				key={keyTable}
				columns={columns}
				data={listData}
				defaultSortFieldId={1}
				pagination
				paginationComponentOptions={paginationComponentOptions}
				onRowDoubleClicked={handleSelected}
			/>
			{showPopup &&
				<div className='popup' >
				<div className="popup-content">
					<div className='header-popup flex-center'>
						<div>Chi tiết đơn hàng</div>
						<div onClick={() => setshowPopup(false)}>X</div>
					</div>
					<div className='body-popup'>
						<div className='item'> Người mua: {rowSelected.user_name}</div>
						<div className='item'> Ngày mua: {formatDate(rowSelected.created_at)}</div>
						<div className='item'> Người nhận: {rowSelected.recipient_name}</div>
						<div className='item'> Số điện thoại nhận: {rowSelected.recipient_phone}</div>
						<div className='item'> Dịa chỉ nhận: {rowSelected.shipping_address}</div>
						<div className='item'> Ngày nhận: {rowSelected.shipping_date}</div>

						<div className='item'>
							<b>Danh sách đơn:</b>
							<div className='flex'>
								<div className='col-detail'> Tên sách</div>
								<div className='col-detail'>  Số lượng</div>
								<div className='col-detail'>  Giá tiền</div>
								<div className='col-detail'>  Tổng tiền</div>
							</div>
							{orderDetail && orderDetail.map((item)=>{
								return (
									<div className='flex'>
										<div className='col-detail'>  {item.book_name}</div>
										<div className='col-detail'>  {item.quantity}</div>
										<div className='col-detail'>  {item.price_per_item} đ</div>
										<div className='col-detail'>  {item.total_price} đ</div>
									</div>
								)
							})}
						</div>

						<div className='item'> Tổng tiền: {rowSelected.total_price} đ</div>
						<div className='item'> Trạng thái: {rowSelected.status}</div>
					</div>
					<div className='footer-popup'>
						{rowSelected.status != CONFIRM_STATUS 
						&& 
						<button className='button' onClick={hanldeConfirm}>Xác nhận</button>
						}
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default AdminOrder;
