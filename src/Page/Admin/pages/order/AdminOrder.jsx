import React, { useEffect, useState } from "react";
import "./AdminOrder.scss";
import DataTable from "react-data-table-component";
import { getOrderDetail, getOrders } from "../../../../Api/apiAdmin";
import { updateOrder } from "../../../../Api/updateOrder";
import { updateBook } from "../../../../Api/updateBook";
import { fetchBooks } from "../../../../Api/getListBook";

const AdminOrder = () => {
    const [listData, setListData] = useState([]); // Dữ liệu chính
    const [listSearchOrder, setListSearchOrder] = useState([]); // Dữ liệu đã lọc
    const [keyTable] = useState(1); // Key để reset DataTable
    const [rowSelected, setRowSelected] = useState({}); // Dữ liệu đơn hàng được chọn
    const [showPopup, setShowPopup] = useState(false); // Hiển thị popup
    const [orderDetail, setOrderDetail] = useState([]); // Chi tiết đơn hàng
    const [currentFilter, setCurrentFilter] = useState(""); // Bộ lọc hiện tại
    const [activeButton, setActiveButton] = useState(0); // Index của nút active
    const [bookUpdate,setBookUpdate] = useState({})

    const CONFIRM_STATUS = ["Chờ xác nhận", "Đã xác nhận", "Chờ vận chuyển", "Đang giao", "Hoàn thành"];

    // Hàm tải dữ liệu từ API
    const loadDataGrid = async () => {
        try {
            const data = await getOrders({ search: "" });
            const safeData = Array.isArray(data) ? data : [];
            
            // Sắp xếp danh sách theo ngày mới nhất
            const sortedData = safeData.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            
            setListData(sortedData);
    
            // Áp dụng bộ lọc hiện tại
            setListSearchOrder(
                currentFilter === "" 
                    ? sortedData 
                    : sortedData.filter((order) => order.status === currentFilter)
            );
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu:", err);
            setListData([]);
            setListSearchOrder([]);
        }
    };
    

    // Load dữ liệu khi component được mount
    useEffect(() => {
        loadDataGrid();
    }, []);

    // Hàm thay đổi bộ lọc
    const handleChangeFilter = (status,index) => {
        setCurrentFilter(status); // Cập nhật trạng thái bộ lọc
        setActiveButton(index);  // Cập nhật nút đang active
        setListSearchOrder(
            status === "" ? listData : listData.filter((order) => order.status === status)
        );
    };

    // Hàm cập nhật trạng thái đơn hàng
    const handleConfirm = async (row) => {
        const currentIndex = CONFIRM_STATUS.indexOf(row.status);
        if (currentIndex < CONFIRM_STATUS.length - 1) {
            const updatedRow = { ...row, status: CONFIRM_STATUS[currentIndex + 1] };
            try {
                // if(updatedRow.status === "Đã xác nhận"){
                //     const listBook = await fetchBooks()
                //     orderDetail.map((item,key)=>{
                //         setBookUpdate(
                //             listBook.filter((book)=> book.id === item.book_id)
                //         );
                //         console.log(bookUpdate)
                //     })
                // }
                updatedRow.status === "Hoàn thành" ?
                    await updateOrder(updatedRow.order_id, { status: updatedRow.status,payment_status:"Đã thanh toán" })
                    :await updateOrder(updatedRow.order_id, { status: updatedRow.status });
                await loadDataGrid(); // Reload dữ liệu sau khi cập nhật
            } catch (err) {
                console.error("Lỗi khi cập nhật trạng thái:", err);
            }
        } else {
            alert("Trạng thái đã ở mức cao nhất!");
        }
    };

    // Hàm hủy đơn hàng
    const handleCancel = async (row) => {
        const updatedRow = { ...row, status: "Đã hủy" };
        try {
            await updateOrder(updatedRow.order_id, { status: updatedRow.status });
            await loadDataGrid(); // Reload dữ liệu sau khi hủy
        } catch (err) {
            console.error("Lỗi khi hủy đơn hàng:", err);
        }
    };

    // Lấy chi tiết đơn hàng
    const getDetailOrder = async (orderId) => {
        try {
            const data = await getOrderDetail(orderId);
            setOrderDetail(data);
        } catch (err) {
            console.error("Lỗi khi tải chi tiết đơn hàng:", err);
        }
    };

    // Hàm chọn dòng trong bảng
    const handleSelected = async (row) => {
        setRowSelected(row);
        await getDetailOrder(row.order_id);
        setShowPopup(true);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.trim().toLowerCase().replace(/\s+/g, " "); // Chuyển từ khóa tìm kiếm về chữ thường
        if (!keyword) {
            // Nếu không nhập gì, hiển thị toàn bộ dữ liệu
            setListSearchOrder(
                currentFilter === "" 
                    ? listData 
                    : listData.filter((order) => order.status === currentFilter)
            );
        } else {
            // Tìm kiếm dựa trên các trường cụ thể (mã đơn hàng, người tạo)
            const filteredData = listData.filter(
                (order) =>
                    String(order.order_id).toLowerCase().includes(keyword) || // Tìm theo mã đơn hàng
                    order.user_name.toLowerCase().includes(keyword)   // Tìm theo người tạo
            );
    
            // Áp dụng bộ lọc nếu có
            setListSearchOrder(
                currentFilter === "" 
                    ? filteredData 
                    : filteredData.filter((order) => order.status === currentFilter)
            );
        }
    };
    
    const columns = [
        {
            id: 1,
            name: "Mã đơn hàng",
            selector: (row) => row.order_id,
            reorder: true,
        },
        {
            id: 2,
            name: "Người tạo",
            selector: (row) => row.user_name,
            reorder: true,
        },
        {
            id: 3,
            name: "Ngày đặt đơn",
            selector: (row) => new Date(row.created_at).toLocaleString(),
            reorder: true,
        },
        {
            id: 4,
            name: "Trạng thái thanh toán",
            selector: (row) => row.payment_status,
            reorder: true,
        },
        {
            id: 5,
            name: "Trạng thái đơn",
            selector: (row) => row.status,
            reorder: true,
        },
        {
            id: 6,
            name: "Thao tác",
            cell: (row) => (
                <div className="order-operation">
                    <button
                        className="button-operation"
                        onClick={() => handleConfirm(row)}
                        disabled={row.status === "Hoàn thành" || row.status === "Đã hủy"}
                    >
                        {CONFIRM_STATUS[CONFIRM_STATUS.indexOf(row.status) + 1] || "Hoàn thành"}
                    </button>
                    <button
                        className="button-cancel"
                        disabled={row.status !== "Chờ xác nhận" || row.status === "Đã hủy"}
                        onClick={() => handleCancel(row)}
                    >
                        Hủy
                    </button>
                </div>
            ),
            center: true,
            reorder: true,
        },
    ];

    const menu = [
        { name: "Tất cả", status: "" },
        { name: "Chờ xác nhận", status: "Chờ xác nhận" },
        { name: "Đã xác nhận", status: "Đã xác nhận" },
        { name: "Chờ vận chuyển", status: "Chờ vận chuyển" },
        { name: "Đang giao", status: "Đang giao" },
        { name: "Hoàn thành", status: "Hoàn thành" },
        { name: "Đã hủy", status: "Đã hủy" },
    ];

    return (
        <div className="admin-order">
            <div className="home-title">Đơn hàng</div>
            <div className="header-page">
            <input
                placeholder="Tìm kiếm"
                className="input input-search"
                onChange={handleSearch}
            />
            </div>
            <div className="admin-order-navbar">
                {menu.map((item, key_item) => (
                        <button key={key_item} className={key_item === activeButton ? "active":""} onClick={() => handleChangeFilter(item.status,key_item)}>
                            {item.name}
                        </button>
                ))}
            </div>
            <DataTable
                key={keyTable}
                columns={columns}
                data={listSearchOrder}
                defaultSortFieldId={3} // Sắp xếp theo cột "Ngày đặt đơn"
                defaultSortAsc={false} // Sắp xếp giảm dần
                pagination
                onRowDoubleClicked={handleSelected}
            />
            {showPopup && (
                <div className='popup'>
                    <div className="popup-content">
                        <div className='header-popup flex-center'>
                            <div>Chi tiết đơn hàng</div>
                            <div onClick={() => setShowPopup(false)}>X</div>
                        </div>
                        <div className='body-popup'>
                            <div className='item'> Người mua: {rowSelected.user_name}</div>
                            <div className='item'> Ngày mua: {new Date(rowSelected.created_at).toLocaleString()}</div>
                            <div className='item'> Người nhận: {rowSelected.recipient_name}</div>
                            <div className='item'> Số điện thoại nhận: {rowSelected.recipient_phone}</div>
                            <div className='item'> Địa chỉ nhận: {rowSelected.shipping_address}</div>
                            <div className='item'> Ngày nhận: 
                                {rowSelected.status === "Hoàn thành" && new Date(rowSelected.updated_at).toLocaleString()}</div>
                            <div className='item'>
                                <b>Danh sách đơn:</b>
                                <div className='flex'>
                                    <div className='col-detail'>Tên sách</div>
                                    <div className='col-detail'>Số lượng</div>
                                    <div className='col-detail'>Giá tiền</div>
                                    <div className='col-detail'>Tổng tiền</div>
                                </div>
                                {Array.isArray(orderDetail) && orderDetail.length > 0 ? (
                                    orderDetail.map((item, index) => (
                                        <div className='flex' key={index}>
                                            <div className='col-detail'>{item.book_name}</div>
                                            <div className='col-detail'>{item.quantity}</div>
                                            <div className='col-detail'>{Number(item.price_per_item)}.000 đ</div>
                                            <div className='col-detail'>{Number(item.total_price)}.000 đ</div>
                                        </div>
                                    ))
                                ) : (
                                    <div>Không có dữ liệu chi tiết đơn hàng.</div>
                                )}
                            </div>
                            <div className='item'> Tổng tiền: {rowSelected.total_price}.000 đ</div>
                            <div className='item'> Trạng thái: {rowSelected.status}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrder;
