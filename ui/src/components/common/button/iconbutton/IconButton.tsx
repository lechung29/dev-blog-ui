/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import "./index.scss"
import { classNames } from "../../../../utils/helper";

interface IIconButtonProps extends ButtonProps {
	rotate?: boolean;
	isReloadButton?: boolean;
	icon?: JSX.Element;
	size: "large" | "medium" | "small"
}

const IconButtonView: React.FunctionComponent<IIconButtonProps> = (props) => {
	const { icon, size, rotate, isReloadButton, className, ...rest } = props

	const reloadIcon = React.useMemo(() => {
		return !!isReloadButton
			? <CachedIcon className={classNames("g-reload-icon", { "g-rotate": rotate })} />
			: icon
	}, [isReloadButton, icon])

	return (
		<Button
			{...rest}
			className={classNames('g-icon-button', className)}
			aria-label="iconButton"
			size={size}
		>
			{reloadIcon}
		</Button>
	);
};

export {
	IconButtonView as IconButton
}
