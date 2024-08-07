import React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardPanel from "../components/dashboardPanel/DashboardPanel";
import { Toaster } from "react-hot-toast";

interface IDashboardLayoutProps {
	children: React.ReactNode;
	title?: string;
}

const DashboardLayout: React.FunctionComponent<IDashboardLayoutProps> = (props) => {
	const { title, children } = props;
	return (
		<React.Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title}</title>
			</Helmet>
			<div className="g-dashboard-layout-container">
				<div className="g-dashboard-main">
					<DashboardHeader />
					<section style={{ display: "flex", height: 'calc(100vh - 90px)' }}>
						<Toaster containerClassName="g-toaster-container" position="bottom-right" reverseOrder={false} />
						<DashboardPanel />
						{children}
					</section>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DashboardLayout;
