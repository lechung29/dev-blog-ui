import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { IAction } from "../../../types/Function";

export enum ISeverity {
	error = "error",
    warning = "warning",
    info = "info",
    success = "success",
}
interface IAlertProps {
	open: boolean;
	message: string;
	severity: ISeverity;
	onClose: IAction
}
const AlertView: React.FunctionComponent<IAlertProps> = (props) => {
	const { message, onClose, open, severity} = props
	return (
		<Snackbar 
			anchorOrigin={{
				vertical: "bottom", 
				horizontal: "right"
			}}  
			open={open} 
			autoHideDuration={5000} 
			onClose={onClose}
		>
			<Alert 
				severity={severity} 
				onClose={onClose}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export { AlertView as Alert };
