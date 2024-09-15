import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Stack } from "@mui/material";
import { Label } from "../../label/Label";
import { ITooltipHostPlacement } from "../../tooltiphost/TooltipHost";
import "./index.scss"

interface IBarChartDataProps {
	dataKey: string;
	label: string;
}

interface IBarChartProps {
	chartTitle: string;
	chartCategoryLabel: string;
	width?: number;
	height?: number;
	dataColumns: IBarChartDataProps[],
	dataSet: any[]
	className?: string;
}

const BarChartView: React.FunctionComponent<IBarChartProps> = (props) => {
	const { chartCategoryLabel, chartTitle, dataColumns, dataSet, height, width, className } = props

	const chartSetting = {
		yAxis: [
			{
				label: chartCategoryLabel,
			},
		],
		width: width,
		height: height,
		sx: {
			[`.${axisClasses.left} .${axisClasses.label}`]: {
				transform: "translate(-20px, 0)",
			},
		},
	};
	return (
		<Stack className="g-bar-chart-container">
			<Label
				bold
				title={chartTitle}
				tooltipProps={{
					arrow: true,
					placement: ITooltipHostPlacement.Top

				}}
				className="g-bar-chart-title"
			/>
			<BarChart
				dataset={dataSet}
				xAxis={[{ scaleType: "band", dataKey: "month" }]}
				series={dataColumns}
				className={className}
				{...chartSetting}
			/>
		</Stack>
	);
};

export { BarChartView as BarChart };
