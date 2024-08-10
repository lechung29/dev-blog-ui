import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import "./index.scss"

interface IIconButtonProps extends ButtonProps {
    rotate?: boolean;
    isReloadButton?: boolean;
	icon?: JSX.Element;
	buttonStyle?: React.CSSProperties;
    size: "large" | "medium" | "small"
}

const IconButtonView: React.FunctionComponent<IIconButtonProps> = (props) => {
    const { icon, size, rotate, isReloadButton, buttonStyle, ...rest} = props
	return (
		<Button {...rest} className={`${props.className ?? ""} g-icon-button`} style={buttonStyle} aria-label="iconButton" size={size}>
			{!!isReloadButton ? <CachedIcon className={`g-reload-icon ${rotate && "g-rotate"}`} /> : icon}
		</Button>
	);
};

export {
    IconButtonView as IconButton
}
