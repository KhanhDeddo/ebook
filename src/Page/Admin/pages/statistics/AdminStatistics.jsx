import React, { useState } from 'react';
import './AdminStatistics.scss';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatistics = () => {
  const [view, setView] = useState("all"); // Trạng thái lọc dữ liệu ("all", "month", "day")

  // Dữ liệu doanh thu mẫu (theo từng tháng)
  const yearData = [
    { month: "1", revenue: 120 },
    { month: "2", revenue: 150 },
    { month: "3", revenue: 180 },
    { month: "4", revenue: 200 },
    { month: "5", revenue: 220 },
    { month: "6", revenue: 250 },
    { month: "7", revenue: 300 },
    { month: "8", revenue: 350 },
    { month: "9", revenue: 280 },
    { month: "10", revenue: 320 },
    { month: "11", revenue: 360 },
    { month: "12", revenue: 400 },
  ];

  // Dữ liệu chi tiết trong một tháng (30 ngày)
  const monthData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 50) + 10, // Doanh thu ngẫu nhiên từ 10 đến 60
  }));

  // Dữ liệu chi tiết trong một ngày (24 giờ)
  const dayData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}`,
    revenue: Math.floor(Math.random() * 10) + 1, // Doanh thu ngẫu nhiên từ 1 đến 10
  }));

  // Dữ liệu biểu đồ dựa trên trạng thái lọc
  const data =
    view === "all"
      ? {
          labels: yearData.map((item) => `Tháng ${item.month}`), // Trục X là các tháng
          datasets: [
            {
              label: "Doanh thu (triệu VND)",
              data: yearData.map((item) => item.revenue), // Dữ liệu doanh thu theo tháng
              backgroundColor: "rgba(4, 0, 255, 0.6)",
              borderColor: "rgba(4, 0, 255, 0.6)",
              borderWidth: 1,
            },
          ],
        }
      : view === "month"
      ? {
          labels: monthData.map((item) => `${item.day}`), // Trục X là các ngày
          datasets: [
            {
              label: "Doanh thu (triệu VND)",
              data: monthData.map((item) => item.revenue), // Dữ liệu doanh thu theo ngày
			  backgroundColor: "rgba(4, 0, 255, 0.6)",
              borderColor: "rgba(4, 0, 255, 0.6)",
              borderWidth: 1,
            },
          ],
        }
      : {
          labels: dayData.map((item) => item.hour), // Trục X là các giờ
          datasets: [
            {
              label: "Doanh thu (triệu VND)",
              data: dayData.map((item) => item.revenue), // Dữ liệu doanh thu theo giờ
              backgroundColor: "rgba(4, 0, 255, 0.6)",
              borderColor: "rgba(4, 0, 255, 0.6)",
              borderWidth: 1,
            },
          ],
        };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "bottom",
        text:
          view === "all"
            ? "Thống kê doanh thu năm 2022"
            : view === "month"
            ? "Thống kê doanh thu 30 ngày gần đây"
            : "Thống kê doanh thu trong ngày (24 giờ)",
      },
    },
    scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: view === "all" ? "Tháng" : view === "month" ? "Ngày" : "Giờ",
    //     },
    //   },
      y: {
        title: {
          display: true,
          text: "Doanh thu (triệu VND)",
        },
      },
    },
  };

  return (
    <div className="admin-statistics">
      <div className="row">
			<div className="col-lg-9 bar-chart">
				<Bar data={data} options={options} />
			</div>
			<div className='col-lg-3 thong-ke'>
				<div className='thong-ke-option'>
					<h3>Tổng doanh thu</h3>
					<h2>1000</h2>
				</div>
				<div className='thong-ke-option'>
					<h3>Tổng đơn hàng</h3>
					<h2>1000</h2>
				</div>
				<div className='thong-ke-option'>
					<h3>Tổng sản phẩm</h3>
					<h2>1000</h2>
				</div>
			</div>
      </div>
	  <div className='row'>
			<div className="col-lg-3 button-statistics">
				<div className='btn-stt-option'>
					<button onClick={() => setView("all")} className="btn btn-primary">
						Thống kê theo năm
					</button>
					<input placeholder='nhap vao nam'/>
				</div>
				<div className='btn-stt-option'>
					<button onClick={() => setView("month")} className="btn btn-secondary">
						Thống kê theo tháng
					</button>
					<input placeholder='nhap vao nam'/>
				</div>
				<div className='btn-stt-option'>
					<button onClick={() => setView("day")} className="btn btn-success">
						Thống kê theo ngày
					</button>
					<input placeholder='nhap vao nam'/>
				</div>
			</div>
	  </div>
    </div>
  );
};

export default AdminStatistics;
