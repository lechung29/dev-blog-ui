import React from "react";
import AppLayout from "../../layout/Layout";
import { loginTitle, logoSrc } from "../../components/utils/common/common";
import { Label } from "../../components/common/label/Label";
import { Image, ImageFit } from "../../components/common/image/Image";
import { TextField } from "../../components/common/textfield/TextField";
import { Box, IconButton, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from '@mui/icons-material/Key';
import { useImmerState } from "../../hook/useImmerState";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { IFunc } from "../../types/Function";

interface ILoginOwnProps {}

interface ILoginFormState {
    username?: string;
    password?: string;
    usernameError?: string;
    passwordError?: string;
    showPassword?: boolean;
    isLoading?: boolean;
}

const inititalState: ILoginFormState = {
    username: "",
    password: "",
    usernameError: undefined,
    passwordError: undefined,
    showPassword: false,
    isLoading: false,
}

const Login: React.FunctionComponent<ILoginOwnProps> = (_props) => {
    const logoHeight: Readonly<number> = 75;
    const logoWidth: Readonly<number> = 350;
    const [state, setState] = useImmerState<ILoginFormState>(inititalState)
    const { username, password, usernameError, passwordError, showPassword, isLoading } = state;

    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        switch (event.target.name) {
            case "username":
                setState((draft) => {
                    draft.username = event.target.value;
                    draft.usernameError = undefined;
                });
                break;
            case "password":
                setState((draft) => {
                    draft.password = event.target.value;
                    draft.passwordError = undefined;
                });
                break;
            default:
                break;
        }
    }

    // const validation: IFunc<boolean> = () => {
    //     let isValid = true;
    //     let userNameError = "";
    //     let passwordError = "";

    //     if ()
    //     return isValid;
    // }

    const handleClickShowPassword = () => setState({showPassword: !state.showPassword})

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setState({isLoading: false});
    }
    return (
        <AppLayout title={loginTitle}>
            <section className="g-login-section">
                <div className="g-login-section-row">
                    <div className="g-login-section-form">
                        <div className="g-login-section-form-label">
                            <Image src={logoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
                        </div>
                        <div className="g-login-section-form-description-label">
                            <Label bold title={"Đăng nhập vào Devblog"} className="g-login-section-description-label" />
                        </div>
                        <Box className="g-login-section-form-input-group" component={"form"} noValidate autoComplete="off">
                            <TextField
                                id="g-login-section-input-username"
                                className="g-login-section-input-item"
                                name="username"
                                value={username}
                                type="text"
                                errorMessage={usernameError}
                                placeholder="Tên người dùng hoặc email"
                                onChange={onChange}
                                startAdornment={
                                    <InputAdornment
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingLeft: "1rem",
                                            color: "#909399",
                                        }}
                                        position="start"
                                    >
                                        <PersonIcon />
                                    </InputAdornment>
                                }
                            />
                            <TextField
                                id="g-login-section-input-username"
                                className="g-login-section-input-item"
                                name="password"
                                value={password}
                                type={showPassword ? "text" : "password"}
                                errorMessage={passwordError}
                                placeholder="Mật khẩu"
                                startAdornment={
                                    <InputAdornment
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingLeft: "1rem",
                                            color: "#909399",
                                        }}
                                        position="start"
                                    >
                                        <KeyIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment 
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#909399",
                                            marginRight: "0.75rem"
                                        }} 
                                        position="end"
                                    >
                                        <IconButton style={{padding: "6px 1rem"}} aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <DefaultButton 
                                variant="contained"
                                type="submit"
                                buttonStyle={{
                                    backgroundColor: "#409eff",
                                    textTransform: "capitalize",
                                    fontSize: 13,
                                    height: 36
                                }}
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    color: "#fff"
                                }}
                                isLoading
                                title={"Đăng nhập"}
                            />
                        </Box>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Login;
