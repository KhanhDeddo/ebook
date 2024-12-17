import React, { useEffect, useState } from 'react';
import './AdminProduct.scss';
import DataTable from "react-data-table-component";
import { addProduct, getProducts, updateProduct} from '../../../../Api/apiAdmin';
import { Space, Switch } from 'antd';
import { updateBook } from '../../../../Api/updateBook';

const AdminProduct = () => {
    const [listData,setlistData] = useState([]);
    const [listSearchProduct,setListSearchProduct] = useState([]);
	const [search] = useState('');
	const [keyTable, setkeyTable] = useState(1);
	const [rowSelected, setrowSelected] = useState({});
	const [showPopup, setshowPopup] = useState(false);
	const [currentFilter, setCurrentFilter] = useState(""); // Bộ lọc hiện tại
	const [activeButton, setActiveButton] = useState(0); // Index của nút active
	const loadDataGrid = async(value) => {
		try {
			const data = await getProducts({ search: value });
			const safeData = Array.isArray(data) ? data : [];
			
			// Sắp xếp danh sách theo ngày mới nhất
			const sortedData = safeData.sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at)
			);
			
			setlistData(sortedData);
	
			// Áp dụng bộ lọc hiện tại
			setListSearchProduct(
				currentFilter === "" 
					? sortedData 
					: sortedData.filter((order) => order.status === currentFilter)
			);
		} catch (err) {
			console.error("Lỗi khi tải dữ liệu:", err);
			setlistData([]);
			setListSearchProduct([]);
		}
	};
	// Hàm thay đổi bộ lọc
	const handleChangeFilter = (status,index) => {
		setCurrentFilter(status); // Cập nhật trạng thái bộ lọc
		setActiveButton(index);  // Cập nhật nút đang active
		setListSearchProduct(
			status === "" ? listData : listData.filter((order) => order.status === status)
		);
	};
	
	const [statePopup, setstatePopup] = useState(1);
	const STATE_ADD = 2;

	const updateStatus = async(id,status) =>{
		try{
			const data = {status_book : status}
			await updateBook(id,data)
		}catch(error){}
	}
	useEffect(()=>{
		loadDataGrid(search);
    }, [])

	const handleEdit = (row) => {
		setrowSelected(row);  // Lưu thông tin hàng được chọn
		setshowPopup(true);   // Hiển thị popup
		setstatePopup(1);     // Đặt trạng thái thành "Sửa"
	};
	
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
			name: "Trạng thái",
			selector: (row) => (
			  <Space direction="vertical">
				<Switch
				  checkedChildren="Đang bán"
				  unCheckedChildren="Ngưng bán"
				  defaultChecked={row.status_book === "Đang bán"}
				  className="custom-switch"
				  onChange={(checked) => {
					const newStatus = checked ? "Đang bán" : "Ngưng bán";
					updateStatus(row.id,newStatus)
					console.log(`Trạng thái mới của sách ID ${row.id}: ${newStatus}`);
				  }}
				/>
			  </Space>
			),
			center: true,
			reorder: true,
		},		  
		// {
		// 	id: 4,
		// 	name: "Ngày tạo",
		// 	selector: (row) => new Date(row.created_at).toLocaleString(),
		// 	reorder: true
		// },
		{
			id: 5,
			name: "Giá tiền",
			selector: (row) => row.price,
			reorder: true
		},
		{
			id: 6,
			name: "Thể loại",
			selector: (row) => row.category,
			reorder: true
		},
		{
			id: 7,
			name: "Số lượng sách",
			selector: (row) => row.stock_quantity,
			center:true,
			reorder: true
		},
		{
			id: 8,
			name: "Thao tác",
			cell: (row) => (
				<div className="btn-update">
					<button 
						onClick={() => handleEdit(row)}
					>
						Cập nhật
					</button>
				</div>
			),
			center:true,
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
			name: 'Mô tả',
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
			name: 'Thể loại',
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
			name: 'Số lượng sách',
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

	const hanldeConfirm = async () => {
		if (statePopup === STATE_ADD) {
			var res = await addProduct(rowSelected);
		}else {
			res = await updateProduct(rowSelected);
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
	const menu = [
		{name:"Tất cả",index:"0"},
		{name:"Đang bán",index:"1"},
		{name:"Ngưng bán",index:"2"},
		{name:"Thể loại",index:"3"},
		{name:"Tác giả",index:"4"},
	]
	return (
		<div className=''>
			<div className="home-title">Sản phẩm</div>
			<div className='input-btn-products'>
				<input placeholder='Tìm kiếm' className='input input-search' onChange={handleSearch} />
				<button onClick={handleAdd}>Thêm mới</button>
			</div>
			<div className='ad-prd-navbar'>
				{menu.map((item, key_item) => (
					item.name === "Thể loại" || item.name === "Tác giả" ? (
						<select
							// value={}
							// onChange={(e) => setLevelSchoolFilter(e.target.value)} // Cập nhật bộ lọc cấp học
						>
							<option value="">Tất cả</option>
							<option value="Tiểu học">Tiểu học</option>
							<option value="Trung học cơ sở">Trung học cơ sở</option>
							<option value="Trung học phổ thông">Trung học phổ thông</option>
						</select>
					) : (
						<button 
							key={key_item} 
							className={key_item === activeButton ? "active":""} 
							onClick={() => handleChangeFilter(item.status_book,key_item)}
						>
							{item.name}
						</button>
					)
				))}
			</div>

			<DataTable
				key={keyTable}
				columns={columns}
				data={listSearchProduct}
				defaultSortFieldId={1}
				defaultSortAsc = {false}
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
						<button onClick={hanldeConfirm}>Lưu</button>
					</div>
				</div>
			</div>
			}
		</div>
	);
};

export default AdminProduct;
