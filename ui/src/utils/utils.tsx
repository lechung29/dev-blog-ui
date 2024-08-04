import toast from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export type IToastProps = "success" | "error";

export const renderToast = (type: IToastProps, message: string) => {
	toast(
		(t) => (
			<div className="g-toaster-content">
				{type === "success" ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
				<p className="g-toaster-message">{message}</p>
				<IconButton onClick={() => toast.dismiss(t.id)}>
					<ClearIcon />
				</IconButton>
			</div>
		),
		{
			duration: 6000,
		}
	);
};
