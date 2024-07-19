import React from "react";
import AppLayout from "../../layout/Layout";
import { loginTitle, logoSrc } from "../../components/utils/common/common";
import { ILabelBoldType, Label } from "../../components/common/label/Label";
import { Image } from "../../components/common/image/Image";
import { ImageFit, Stack } from "@fluentui/react";
import { TextField } from "../../components/common/textfield/TextField";
import { Icon } from "../../components/common/icon/Icon";

interface ILoginOwnProps {}

const Login: React.FunctionComponent<ILoginOwnProps> = (_props) => {
    const logoHeight: Readonly<number> = 75;
    const logoWidth: Readonly<number> = 350;
    return (
        <AppLayout title={loginTitle}>
            <section className="g-login-section">
                <div className="g-login-section-row">
                    <div className="g-login-section-form">
                        <div className="g-login-section-form-label">
                            <Image 
                                src={logoSrc} 
                                objectFit={ImageFit.cover} 
                                width={logoWidth} 
                                height={logoHeight} 
                                alt={"logo"} 
                            />
                        </div>
                        <div className="g-login-section-form-description-label">
                            <Label
                                bold 
                                boldType={ILabelBoldType.SemiBold} 
                                className="g-login-section-description-label" 
                            >
                                {"Đăng nhập vào Devblog"}
                            </Label>
                        </div>
                        <Stack 
                            horizontal 
                            horizontalAlign="start" 
                            verticalAlign="center" 
                            className="g-login-section-form-input-field"
                        >
                            <div className="g-login-section-form-input-item">
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Icon 
                                        className="g-login-section-form-input-icon" 
                                        iconName="FollowUser"
                                    />
                                </div>
                                <TextField 
                                    iconProps={{
                                        iconName: "FollowUser"
                                    }}
                                    placeholder="Tên người dùng hoặc email"
                                    className="g-login-section-form-input-element"
                                    width={"100%"}
                                />
                            </div>
                            <div className="g-login-section-form-input-item">
                                <TextField 
                                    iconProps={{
                                        iconName: "FollowUser"
                                    }}
                                    placeholder="Tên người dùng hoặc email"
                                    className="g-login-section-form-input-element"
                                    width={"100%"}
                                />
                            </div>
                        </Stack>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Login;
