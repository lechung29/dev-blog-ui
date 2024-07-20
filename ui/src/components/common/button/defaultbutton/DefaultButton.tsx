import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

export interface IDefaultButtonProps extends ButtonProps {
    isLoading?: boolean;
    title?: string;
    buttonStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
}

const DefaultButtonView: React.FunctionComponent<IDefaultButtonProps> = (props) => {
    const { isLoading, title } = props;
    return <Button
        {...props}
        style={props.buttonStyle}
        disabled={isLoading || props.disabled}
    >
        {isLoading ? <CircularProgress style={props.iconStyle} /> : props.children ? props.children : title} 
    </Button>
};

export {
    DefaultButtonView as DefaultButton
}
