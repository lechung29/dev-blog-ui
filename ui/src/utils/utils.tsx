import toast from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export enum IToastProps {
	success = "success",
	error = "error"
}
export const renderToast = (type: IToastProps, message: string) => {
	toast(
		(t) => (
			<div className="g-toaster-content">
				{type === IToastProps.success ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
				<p className="g-toaster-message">{message}</p>
				<IconButton onClick={() => toast.dismiss(t.id)}>
					<ClearIcon />
				</IconButton>
			</div>
		),
		{
			duration: 3000,
		}
	);
};

export const highlightSubstring = (parentString: string, subString: string, subTitleStyle: React.CSSProperties) => {
	const regex = new RegExp(`(${subString})`, 'gi');
	return parentString.split(regex).map((part, index) =>
		regex.test(part) ? <span style={subTitleStyle}>{part}</span> : part
	)
}