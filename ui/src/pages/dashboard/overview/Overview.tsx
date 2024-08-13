import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Stack } from "@mui/material";
import "./index.scss";
import { PieChart } from "@mui/x-charts/PieChart";

const Overview: React.FunctionComponent = () => {
	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack display={"flex"} marginBottom={3} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={4} flexWrap={"wrap"}>
					<div className="g-overview-card g-overview-all-post">
						<h4>Tổng bài viết của bạn</h4>
						<p>123</p>
					</div>
					<div className="g-overview-card g-overview-month-post">
						<h4>Bài viết trong tháng</h4>
						<p>123</p>
					</div>
					<div className="g-overview-card g-overview-all-like">
						<h4>Tổng số lượt thích</h4>
						<p>123</p>
					</div>
				</Stack>
				<Stack display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={3}>
					<PieChart
						series={[
							{
								data: [
									{ id: 0, value: 10, label: "series A" },
									{ id: 1, value: 15, label: "series B" },
									{ id: 2, value: 20, label: "series C" },
								],
							},
						]}
						width={400}
						height={200}
					/>
				</Stack>
			</div>
		</DashboardLayout>
	);
};

export default Overview;
