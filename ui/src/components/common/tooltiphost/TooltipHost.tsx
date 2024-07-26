import React from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import "./index.scss";

export enum ITooltipHostPlacement {
    BottomEnd = "bottom-end",
    BottomStart = "bottom-start",
    Bottom = "bottom",
    LeftEnd = "left-end",
    LeftStart = "left-start",
    Left = "left",
    RightEnd = "right-end",
    RightStart = "right-start",
    Right = "right",
    TopEnd = "top-end",
    TopStart = "top-start",
    Top = "top",
}

export interface ITooltipHostProps extends TooltipProps {}

const TooltipHostView: React.FunctionComponent<ITooltipHostProps> = (props) => {
    const CustomTooltip = styled(({ className, ...props }: ITooltipHostProps) => <Tooltip {...props} placement="top" arrow classes={{ popper: className }} />)(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.grey[300],
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[5],
            maxWidth: 300,
            padding: "0.75rem 1rem",
            fontSize: 12,
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.grey[300],
          },
    }));
    return <CustomTooltip title={props.title}>{props.children}</CustomTooltip>;
};

export { TooltipHostView as TooltipHost };
