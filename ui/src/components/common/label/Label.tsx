import { ILabel, ILabelProps, ILabelStyleProps, ILabelStyles, Label, mergeStyles } from "@fluentui/react";
import React from "react";
import { ITooltipHostProps } from "../tooltiphost/TooltipHost";
import TooltipIcon from "../tooltipicon/TooltipIcon";
import "./index.scss";

enum ILabelBoldType {
    SemiBold = 600,
    Bold = "bold",
    Regular = 400,
    Light = 300,
    Semilight = 200,
    Thin = 100,
}

interface IILabelProps extends ILabelProps {
    bold?: boolean;
    boldType?: ILabelBoldType;
    italic?: boolean;
    description?: string;
    descriptionTooltipProps?: ITooltipHostProps;
}

interface IILabel extends ILabel {}

interface IILabelStyleProps extends ILabelStyleProps {}

interface IILabelStyle extends ILabelStyles {}

const LabelView: React.FunctionComponent<IILabelProps> = (props) => {
    const { bold, boldType, italic, children, description, descriptionTooltipProps } = props;
    const className = mergeStyles(props.className, bold && "g-label-bold", italic && "g-label-italic", "g-label", {
        fontWeight: boldType ? `${boldType} !important` : `${ILabelBoldType.Regular} !important`,
    });
    if (children) {
        if (description) {
            return (
                <div className="g-label-container">
                    <Label {...props} className={className} tabIndex={props.tabIndex || 0} />
                    <TooltipIcon tooltip={descriptionTooltipProps} content={description} />
                </div>
            );
        } else {
            return <Label {...props} className={className} tabIndex={props.tabIndex || 0} />;
        }
    } else {
        return null;
    }
};

export { LabelView as Label, ILabelBoldType };

export type { IILabel as ILabel, IILabelProps as ILabelProps, IILabelStyle as ILabelStyles, IILabelStyleProps as ILabelStyleProps };
