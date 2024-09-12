import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./index.scss"
import { DefaultButton } from "../button/defaultbutton/DefaultButton";
import { IFunc } from "../../../types/Function";

interface IConfirmDialogProps {
	open: boolean;
	onClose: () => void;
	handleConfirm: IFunc<void | Promise<void>>
	title: string;
	content: React.ReactNode
	isLoading: boolean;
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
				<Button style={{ textTransform: "none" }} onClick={props.onClose}>Hủy</Button>
				<DefaultButton
					className='g-update-form-submit-button'
					variant="contained"
					onClick={props.handleConfirm}
					autoFocus
					iconStyle={{
						width: 20,
						height: 20,
						color: "#fff",
					}}
					isLoading={props.isLoading}
					title={"Xác nhận"}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
