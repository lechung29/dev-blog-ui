import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";
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
    return <Tooltip {...props}>{props.children}</Tooltip>;
};

export { TooltipHostView as TooltipHost };
