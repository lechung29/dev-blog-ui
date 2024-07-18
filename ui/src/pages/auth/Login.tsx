import React from "react";
import AppLayout from "../../layout/Layout";
import { AppName, loginTitle } from "../../components/utils/common/common";
import "./index.scss";
import { Label } from "@fluentui/react";

interface ILoginOwnProps {}

const Login: React.FunctionComponent<ILoginOwnProps> = (_props) => {
    return (
        <AppLayout title={loginTitle}>
            <section className="g-login-section">
                <div className="g-login-section-row">
                    <div className="g-login-section-form">
                        <div className="g-login-section-form-label">
                            <Label className="g-login-section-label">{AppName}</Label>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Login;
