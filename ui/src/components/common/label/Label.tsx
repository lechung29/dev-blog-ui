import React, { HTMLAttributes } from "react";
import { ITooltipHostPlacement, TooltipHost } from "../tooltiphost/TooltipHost";
import "./index.scss";


interface ILabelProps extends HTMLAttributes<HTMLLabelElement> {
    bold?: boolean;
    italic?: boolean;
    tooltipProps?: {
        arrow?: boolean;
        placement?: ITooltipHostPlacement;
    };
    title: string;
}

const LabelView: React.FunctionComponent<ILabelProps> = (props) => {
    const { bold, italic, tooltipProps } = props;
    const className = `${props.className} ${bold ? "g-label-bold" : ""}${italic ? "g-label-italic" : ""} g-label`;
    if (!!tooltipProps) {
        return (
            <TooltipHost 
                className="g-label-tooltip"
                title={props.title} 
                arrow={props.tooltipProps?.arrow} 
                placement={props.tooltipProps?.placement}
            >
                <label className={className}>
                    {props.title}
                </label>
            </TooltipHost>
        );
    } else {
        return (
            <label className={className}>
                {props.title}
            </label>
        );
    }
};

export { LabelView as Label };

export type { ILabelProps };
