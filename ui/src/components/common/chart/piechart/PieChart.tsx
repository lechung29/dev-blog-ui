import { Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";
import { Label } from "../../label/Label";
import { ITooltipHostPlacement } from "../../tooltiphost/TooltipHost";
import "./index.scss"

interface IPieChartDataProps {
	id: string | number;
	value: number;
	label: string;
}

interface IPieChartProps {
	data: IPieChartDataProps[];
	chartTitle: string;
	width?: number;
	height?: number;
}

const PieChartView: React.FunctionComponent<IPieChartProps> = (props) => {
	const { chartTitle, data, height, width } = props
	return (
		<Stack className="g-pie-chart-container">
			<Label
				bold
				title={chartTitle}
				tooltipProps={{
					arrow: true,
					placement: ITooltipHostPlacement.Top

				}}
				className="g-pie-chart-title"
			/>
			<PieChart
				series={[
					{
						data: data,
					},
				]}
				width={width}
				height={height}
			/>
		</Stack>
	);
};

export { PieChartView as PieChart };
