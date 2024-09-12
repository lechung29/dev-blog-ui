import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";
import { IFunc } from "../../../../types/Function";
import "./index.scss"
import { classNames } from "../../../../utils/helper";

export interface IDefaultButtonProps extends ButtonProps {
    isLoading?: boolean;
    title?: string;
    iconStyle?: React.CSSProperties;
}

const DefaultButtonView: React.FunctionComponent<IDefaultButtonProps> = (props) => {
    const { isLoading, title, style, iconStyle, className, children, disabled, ...rest } = props;
    const onRenderTitle: IFunc<React.ReactNode> = () => {
        return isLoading ? <CircularProgress style={iconStyle} /> : children ? children : title
    }
    return <Button
        {...rest}
        disabled={disabled}
        style={style}
        className={classNames(className, { 'g-disable-button': disabled })}
    >
        {onRenderTitle()}
    </Button>
};

export {
    DefaultButtonView as DefaultButton
}
