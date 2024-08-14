import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Stack } from "@mui/material";
import { Label } from "../../label/Label";
import { ITooltipHostPlacement } from "../../tooltiphost/TooltipHost";

interface IBarChartDataProps {
	dataKey: string;
	label: string;
}

interface IBarChartProps {
	chartTitle: string;
	chartCategoryLabel: string;
	dataColumns: IBarChartDataProps[],
    dataSet: any[]
}

const BarChartView: React.FunctionComponent<IBarChartProps> = (props) => {
	const chartSetting = {
		yAxis: [
			{
				label: props.chartCategoryLabel,
			},
		],
		width: 500,
		height: 200,
		sx: {
			[`.${axisClasses.left} .${axisClasses.label}`]: {
				transform: "translate(-20px, 0)",
			},
		},
	};
	return (
		<Stack display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
			<Label
                bold 
                title={props.chartTitle}
                tooltipProps={{
                    arrow: true,
                    placement: ITooltipHostPlacement.Top 

                }}
                style={{
                    fontSize: 20,
                    color: "#141522"
                }}
            />
            <BarChart
				dataset={props.dataSet}
				xAxis={[{ scaleType: "band", dataKey: "month" }]}
				series={props.dataColumns}
				{...chartSetting}
			/>
		</Stack>
	);
};

export { BarChartView as BarChart };
