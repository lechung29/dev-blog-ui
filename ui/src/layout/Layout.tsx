import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { defaultAppTitle } from "../components/utils/common/common";
import { useLocation } from "react-router-dom";
import "./index.scss";
import ExpiredModal from "../components/ExpiredModal/ExpiredModal";

interface ILayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AppLayout: React.FunctionComponent<ILayoutProps> = (props) => {
    const { title = defaultAppTitle, children } = props;
    const location = useLocation();
    const authRoute = new Set<string>(["/login", "/register"]);
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            <div className="g-app-layout-container">
                {!authRoute.has(location.pathname) ? <Header /> : <React.Fragment />}
                <section style={{ minHeight: authRoute.has(location.pathname) ? "100vh" : "80vh" , flex: 1}}>
                    <Toaster 
						containerClassName="g-toaster-container"
						position="bottom-right"
						reverseOrder={false}
					/>
                    <ExpiredModal />
                    {children}
                </section>
                {!authRoute.has(location.pathname) ? <Footer /> : <React.Fragment />}
            </div>
        </React.Fragment>
    );
};

export default AppLayout;
