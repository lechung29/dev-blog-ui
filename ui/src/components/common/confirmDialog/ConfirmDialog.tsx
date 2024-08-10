import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./index.scss"

interface IConfirmDialogProps {
	open: boolean;
	onClose: () => void;
	handleConfirm: () => void;
    title: string;
    content: React.ReactNode
}

const ConfirmDialog: React.FunctionComponent<IConfirmDialogProps> = (props) => {
	return (
		<Dialog 
            open={props.open} 
            aria-labelledby="alert-dialog-title" 
            aria-describedby="alert-dialog-description"
        >
			<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{props.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button style={{textTransform: "none"}} onClick={props.onClose}>Close</Button>
				<Button style={{textTransform: "none"}} onClick={props.handleConfirm} autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
