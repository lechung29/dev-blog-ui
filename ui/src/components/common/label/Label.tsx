import React, { HTMLAttributes } from "react";
import { ITooltipHostPlacement, TooltipHost } from "../tooltiphost/TooltipHost";
import "./index.scss";
import { highlightSubstring } from "../../../utils/utils";
import { classNames } from "../../../utils/helper";


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
    const { bold, italic, tooltipProps, subTitle, subTitleStyle, title, endIcon, startIcon, className, ...rest } = props;
    const labelClassName = classNames("g-label", className, { "g-label-bold": bold }, { "g-label-italic": italic })
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
                title={title}
                arrow={tooltipProps?.arrow}
                placement={tooltipProps?.placement}
            >
                <label {...rest} className={labelClassName}>
                    {startIcon ?? <></>}
                    <span>{onRenderTitle()}</span>
                    {endIcon ?? <></>}
                </label>
            </TooltipHost>
        );
    } else {
        return (
            <label {...rest} className={labelClassName}>
                {startIcon ?? <></>}
                <span>{onRenderTitle()}</span>
                {endIcon ?? <></>}
            </label>
        );
    }
};

export { LabelView as Label };

export type { ILabelProps };
