import React from "react";
import { ITooltipHost, ITooltipHostProps, ITooltipHostStyleProps, ITooltipHostStyles, mergeStyles, TooltipHost } from "@fluentui/react";
import "./index.scss"

interface IITooltipHostProps extends ITooltipHostProps {
    a?: string;
    isCustomStyle?: boolean;
}

interface IITooltipHost extends ITooltipHost {}

interface IITooltipHostStyleProps extends ITooltipHostStyleProps {}

interface IITooltipHostStyle extends ITooltipHostStyles {}

const TooltipHostView: React.FunctionComponent<ITooltipHostProps> = (props) => {
    const className = mergeStyles("g-tooltip-view", props.className);
    return (
        <TooltipHost
            {...props}
            className={className}
            calloutProps={{
                ...props.calloutProps,
                calloutMaxWidth: 364,
                style: { maxWidth: "22.75rem", border: "none", ...props.calloutProps?.style },
            }}
        />
    );
};

export { TooltipHostView as TooltipHost };

export type { IITooltipHostProps as ITooltipHostProps, IITooltipHost as ITooltipHost, IITooltipHostStyleProps as ITooltipHostStyleProps, IITooltipHostStyle as ITooltipHostStyles };
