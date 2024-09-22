/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./index.scss"
import { DefaultButton } from "../button/defaultbutton/DefaultButton";
import { IAction1, IFunc } from "../../../types/Function";
import { useTranslation } from "react-i18next";

interface IConfirmDialogProps {
	open: boolean;
	onClose?: () => void;
	handleConfirm: IFunc<void | Promise<void>>
	title: string;
	content: React.ReactNode
	isLoading?: boolean;
	noCancelButton?: boolean;
	isDisable?: boolean
}

const ConfirmDialog: React.FunctionComponent<IConfirmDialogProps> = (props) => {
	const { content, handleConfirm, open, title, isLoading, noCancelButton, onClose, isDisable } = props
	const { t } = useTranslation()
	const iconStyle = React.useMemo(() => {
		return {
			width: 20,
			height: 20,
			color: "#fff",
		}
	}, [])

	const onKeyDown: IAction1<React.KeyboardEvent> = React.useCallback((event) => {
		if (event.key === "Enter") {
			handleConfirm();
		}
	}, [])

	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{!noCancelButton && <Button
					className="g-dialog-footer-button"
					onClick={onClose}
				>
					{t("Common.Cancel")}
				</Button>}
				<DefaultButton
					className='g-update-form-submit-button'
					variant="contained"
					onClick={handleConfirm}
					onKeyDown={onKeyDown}
					disabled={isDisable}
					autoFocus
					iconStyle={iconStyle}
					isLoading={isLoading}
					title={t("Common.Confirm")}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
