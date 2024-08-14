import { Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";
import { Label } from "../../label/Label";
import { ITooltipHostPlacement } from "../../tooltiphost/TooltipHost";

interface IPieChartDataProps {
	id: string | number;
	value: number;
	label: string;
}

interface IPieChartProps {
	data: IPieChartDataProps[];
    chartTitle: string;
}

const PieChartView: React.FunctionComponent<IPieChartProps> = (props) => {
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
			<PieChart
				series={[
					{
						data: props.data,
					},
				]}
				width={400}
				height={200}
			/>
		</Stack>
	);
};

export { PieChartView as PieChart };
