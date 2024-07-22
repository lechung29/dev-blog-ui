import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";
import { IFunc } from "../../../../types/Function";

export interface IDefaultButtonProps extends ButtonProps {
    isLoading?: boolean;
    title?: string;
    buttonStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
}

const DefaultButtonView: React.FunctionComponent<IDefaultButtonProps> = (props) => {
    const { isLoading, title, buttonStyle, iconStyle, ...rest } = props;
    const onRenderTitle: IFunc<React.ReactNode> = () => {
        return isLoading ? <CircularProgress style={props.iconStyle} /> : props.children ? props.children : title
    }   
    return <Button
        {...rest}
        style={props.buttonStyle}
        disabled={isLoading || props.disabled}
    >
        {onRenderTitle()} 
    </Button>
};

export {
    DefaultButtonView as DefaultButton
}
