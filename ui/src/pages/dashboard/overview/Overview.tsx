import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Skeleton, Stack } from "@mui/material";
import "./index.scss";
import { PieChart } from "../../../components/common/chart/piechart/PieChart";
import { BarChart } from "../../../components/common/chart/barchart/BarChart";

const Overview: React.FunctionComponent = () => {
	const dataSet = [
		{ month: "Jan", post: 120 },
		{ month: "Feb", post: 200 },
		{ month: "Mar", post: 90 },
		{ month: "Apr", post: 18 },
		{ month: "May", post: 323 },
		{ month: "Jun", post: 123 },
		{ month: "Jul", post: 102 },
		{ month: "Aug", post: 300 },
		{ month: "Sep", post: 123 },
		{ month: "Oct", post: 11 },
		{ month: "Nov", post: 150 },
		{ month: "Dec", post: 50 },
	];
	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack display={"flex"} marginBottom={5} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={4} flexWrap={"wrap"}>
					<div className="g-overview-card g-overview-all-post">
						<h4>
							<Skeleton />
						</h4>
						<p>
							<Skeleton />
						</p>
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
						chartTitle={"Biểu đồ số bài viết theo thể loại"}
						data={[
							{ id: 0, value: 100, label: "reactjs" },
							{ id: 1, value: 50, label: "node" },
						]}
					/>
					<BarChart
						chartTitle="Biểu đồ bài viết của bạn qua các tháng"
						chartCategoryLabel="Số lượng"
						dataColumns={[{ dataKey: "post", label: "All post" }]}
						dataSet={dataSet}
					/>
				</Stack>
			</div>
		</DashboardLayout>
	);
};

export default Overview;
