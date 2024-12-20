import React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";
import DashboardHeader from "../components/header/DashboardHeader";
import DashboardPanel from "../components/dashboardPanel/DashboardPanel";
import ExpiredModal from "../components/ExpiredModal/ExpiredModal";
import { useMobile } from "../utils/Responsive";

interface IDashboardLayoutProps {
	children: React.ReactNode;
	title?: string;
}

const DashboardLayout: React.FunctionComponent<IDashboardLayoutProps> = (props) => {
	const { title, children } = props;
	const isMobile = useMobile()
	return (
		<React.Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title}</title>
				<link 
                    rel="icon" 
                    type="image/png" 
                    href="/assets/devblog-logo.png" 
                    sizes="300x300" 
                />
			</Helmet>
			<div className="g-dashboard-layout-container">
				<div className="g-dashboard-main">
					<DashboardHeader />
					<section style={{ display: "flex", height: "calc(100vh - 90px)", flex: 1 }}>
						<ExpiredModal />
						{!isMobile && <DashboardPanel />}
						{children}
					</section>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DashboardLayout;
