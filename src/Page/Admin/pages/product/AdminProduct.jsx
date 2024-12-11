import React, { useEffect, useState } from 'react';
import './AdminProduct.scss';
import DataTable from "react-data-table-component";
import { addProduct, getProducts, updateProduct, updateStatusOrder } from '../../../../Api/apiAdmin';

const AdminProduct = () => {
    const [listData,setlistData] = useState([]);

	const [search, setSearch] = useState('');

	const [keyTable, setkeyTable] = useState(1);

	const [rowSelected, setrowSelected] = useState({});

	const [showPopup, setshowPopup] = useState(false);

	const loadDataGrid = async(value) => {
		const data = await getProducts({"search" : value});
		setlistData(data)
	};

	const [statePopup, setstatePopup] = useState(1);

	const STATE_ADD = 2;

	var dataDetail = {};

	const CONFIRM_STATUS = "Xác nhận";

	useEffect(()=>{
		loadDataGrid(search);
    }, [])

	const columns = [
		{
		  id: 1,
		  name: "ID",
		  selector: (row) => row.id,
		  reorder: true
		},
		{
		  id: 2,
		  name: "Tiêu đề",
		  selector: (row) => row.title,
		  reorder: true
		},
		{
			id: 3,
			name: "Tác giả",
			selector: (row) => row.author,
			right: true,
			reorder: true
		},
		{
			id: 4,
			name: "Giá tiền",
			selector: (row) => row.price,
			right: true,
			reorder: true
		},
		{
			id: 5,
			name: "Loại danh mục",
			selector: (row) => row.category,
			right: true,
			reorder: true
		},
		{
			id: 6,
			name: "Số lượng trong kho",
			selector: (row) => row.stock_quantity,
			right: true,
			reorder: true
		},
	];


	const list_detail = [
		{
			name: 'Tiêu đề',
			property: 'title',
			type: 'text'
		},
		{
			name: 'Tác giả',
			property: 'author',
			type: 'text'

		},
		{
			name: 'Chi tiết',
			property: 'description',
			type: 'text'
		},
		{
			name: 'Giá tiền',
			property: 'price',
			type: 'number'
		},
		{
			name: 'Link ảnh',
			property: 'image_url',
			type: 'text'
		},
		{
			name: 'Danh mục',
			property: 'category',
			type: 'text'
		},
		{
			name: 'Lớp',
			property: 'level_class',
			type: 'text'
		},
		{
			name: 'Level trường',
			property: 'level_school',
			type: 'text'
		},
		{
			name: 'Số sách trong kho',
			property: 'stock_quantity',
			type: 'number'
		},
		{
			name: 'Người phát hành',
			property: 'publisher',
			type: 'text'
		},
		{
			name: 'Ngày phát hành',
			property: 'publication_date',
			type: 'date'
		},
	];


	const paginationComponentOptions = {
		selectAllRowsItem: true,
		selectAllRowsItemText: "ALL"
	};

	const handleSelected = async (row) => {
		console.log(row);
		setrowSelected(row);
		dataDetail = row;
		setshowPopup(true);
		setstatePopup(1);
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
		if (statePopup === STATE_ADD) {
			var res = await addProduct(rowSelected);
		}else {
			var res = await updateProduct(rowSelected);
		}
		if (res) {
			setshowPopup(false);
			alert('Lưu thành công');
		}else {
			alert('Có lỗi xảy ra');
		}
		
	}

	const handleAdd = () => {
		setrowSelected({});
		setstatePopup(2);
		setshowPopup(true)
	}

	const handleChange = (event, property) => {
		setrowSelected({ ...rowSelected, [property]: event.target.value });
	  };

	return (
		<div className=''>
			<div className="home-title">Sản phẩm</div>
			<div className='header-page'>
				<button onClick={handleAdd}>Thêm mới</button>
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
						<div>Chi tiết sách</div>
						<div onClick={() => setshowPopup(false)}>X</div>
					</div>
					<div className='body-popup'>
						{list_detail.map((item, key) => {
							return(<div className='item flex-center' key={key}> 
								<span className='title'>{item.name}:</span>
								<input type={item.type} className='value' value={rowSelected[item.property]}
								onChange={(e) => handleChange(e, item.property)}
								/>
							</div>)
						})}

					</div>
					<div className='footer-popup'>
						<button className='button' onClick={hanldeConfirm}>Lưu</button>
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default AdminProduct;
