import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

interface IRedirectPageProps {
	to: string;
	message: string;
}

const RedirectPage: React.FunctionComponent<IRedirectPageProps> = (props) => {
	const [count, setCount] = useState(5);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((preValue) => preValue - 1);
		}, 1000);
		count === 0 &&
			navigate(`${props.to}`, {
				state: location.pathname,
			});
		return () => clearInterval(interval);
	}, [count, navigate, location, props.to]);
    
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				height: "100vh",
				width: "100vw",
				backgroundColor: "#fff",
				gap: "1rem"
			}}
		>
			<CircularProgress style={{color: "#5488c7"}} />
			<p
				style={{
					textAlign: "center",
				}}
			>
				{props.message}
			</p>
		</div>
	);
};

export default RedirectPage;
