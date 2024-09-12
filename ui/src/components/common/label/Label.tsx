import React, { HTMLAttributes } from "react";
import { ITooltipHostPlacement, TooltipHost } from "../tooltiphost/TooltipHost";
import "./index.scss";
import { highlightSubstring } from "../../../utils/utils";


interface ILabelProps extends HTMLAttributes<HTMLLabelElement> {
    bold?: boolean;
    italic?: boolean;
    tooltipProps?: {
        arrow?: boolean;
        placement?: ITooltipHostPlacement;
    };
    title: string;
    subTitle?: string;
    subTitleStyle?: React.CSSProperties;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const LabelView: React.FunctionComponent<ILabelProps> = (props) => {
    const { bold, italic, tooltipProps, subTitle, subTitleStyle, title, endIcon, startIcon,  ...rest } = props;
    const className = `${props.className ?? ""} ${bold ? "g-label-bold" : ""}${italic ? "g-label-italic" : ""} g-label`;
    const onRenderTitle = () => {
        if (subTitle) {
            return highlightSubstring(title, subTitle, subTitleStyle!)
        }
        return title;
    };  

    if (!!tooltipProps) {
        return (
            <TooltipHost 
                className="g-label-tooltip"
                title={props.title} 
                arrow={props.tooltipProps?.arrow} 
                placement={props.tooltipProps?.placement}
            >
                <label {...rest}  className={className}>
                    {startIcon ?? <></>}
                    {onRenderTitle()}
                    {endIcon ?? <></>}
                </label>
            </TooltipHost>
        );
    } else {
        return (
            <label {...rest} className={className}>
                {startIcon ?? <></>}
                {onRenderTitle()}
                {endIcon ?? <></>}
            </label>
        );
    }
};

export { LabelView as Label };

export type { ILabelProps };
