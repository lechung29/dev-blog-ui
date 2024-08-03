import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface IAlertProps {
	open: boolean;
	message: string;
	severity: "error" | "warning" | "info" | "success";
	onClose: () => void;
}
const AlertView: React.FunctionComponent<IAlertProps> = (props) => {
	return (
		<Snackbar 
			anchorOrigin={{
				vertical: "bottom", 
				horizontal: "right"
			}}  
			open={props.open} 
			autoHideDuration={5000} 
			onClose={props.onClose}
		>
			<Alert severity={props.severity} onClose={props.onClose}>
				{props.message}
			</Alert>
		</Snackbar>
	);
};

export { AlertView as Alert };
