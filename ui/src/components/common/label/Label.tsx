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
    subTitle?: string;
    subTitleStyle?: React.CSSProperties;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const LabelView: React.FunctionComponent<ILabelProps> = (props) => {
    const { bold, italic, tooltipProps, subTitle, subTitleStyle, title,  ...rest } = props;
    const className = `${props.className ?? ""} ${bold ? "g-label-bold" : ""}${italic ? "g-label-italic" : ""} g-label`;
    const onRenderTitle = () => {
        if (subTitle && (title.includes(subTitle) || title.includes(subTitle.toLocaleLowerCase()))) {
            const parts = title.split(subTitle);
            return (
                <>
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            <span>{part}</span>
                            {index < parts.length - 1 && (
                                <span style={subTitleStyle}>{subTitle}</span>
                            )}
                        </React.Fragment>
                    ))}
                </>
            );
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
                    {props.startIcon ?? <></>}
                    {onRenderTitle()}
                    {props.endIcon ?? <></>}
                </label>
            </TooltipHost>
        );
    } else {
        return (
            <label {...rest} className={className}>
                {props.startIcon ?? <></>}
                {onRenderTitle()}
                {props.endIcon ?? <></>}
            </label>
        );
    }
};

export { LabelView as Label };

export type { ILabelProps };
