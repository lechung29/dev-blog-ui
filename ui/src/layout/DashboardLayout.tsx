import React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardPanel from "../components/dashboardPanel/DashboardPanel";

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
				<DashboardPanel />
				<div className="g-dashboard-main">
					<DashboardHeader />
					<section style={{flex: 1}}>
						{children}
					</section>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DashboardLayout;
