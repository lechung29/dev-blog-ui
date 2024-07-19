import React from "react";
import { Icon, IIconProps } from "../icon/Icon";
import { ITooltipHostProps, TooltipHost } from "../tooltiphost/TooltipHost";
import "./index.scss";

interface ITooltipIconProps {
    iconName?: string;
    content?: string | JSX.Element | JSX.Element[];
    icon?: IIconProps;
    tooltip?: ITooltipHostProps;
}

const TooltipIcon: React.FunctionComponent<ITooltipIconProps> = (props) => {
    const { iconName, content, tooltip, icon } = props;
    return (
        <TooltipHost className="g-tooltip-host-section" content={content} {...tooltip}>
            {content && <Icon className="g-tooltip-icon" iconName={iconName || "fas-circle-info"} {...icon} />}
        </TooltipHost>
    );
};

export default TooltipIcon;
