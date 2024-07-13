import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { defaultAppTitle } from "../components/utils/common/common";

interface ILayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AppLayout: React.FunctionComponent<ILayoutProps> = (props) => {
    const { title = defaultAppTitle, children } = props;
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default AppLayout;
