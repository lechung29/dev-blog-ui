import React, { useRef } from "react";
import AppLayout from "../../layout/Layout";
import { loginTitle, logoSrc } from "../../components/utils/common/common";
import { Label } from "../../components/common/label/Label";
import { Image, ImageFit } from "../../components/common/image/Image";
import { TextField } from "../../components/common/textfield/TextField";
import { Box, IconButton, InputAdornment, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { useImmerState } from "../../hook/useImmerState";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { IFunc } from "../../types/Function";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "../../components/Auth/GoogleAuth";
import { Divider } from "../../components/common/divider/Divider";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/users/UserSlice";

interface ILoginOwnProps {}

interface ILoginFormState {
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    showPassword: boolean;
    isLoading?: boolean;
}

const inititalState: ILoginFormState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    showPassword: false,
    isLoading: false,
};

const Login: React.FunctionComponent<ILoginOwnProps> = (_props) => {
    const logoHeight: Readonly<number> = 75;
    const logoWidth: Readonly<number> = 350;
    const [state, setState] = useImmerState<ILoginFormState>(inititalState);
    const { email, password, emailError, passwordError, showPassword, isLoading } = state;
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        switch (event.target.name) {
            case "email":
                setState((draft) => {
                    draft.email = event.target.value;
                    draft.emailError = "";
                });
                break;
            case "password":
                setState((draft) => {
                    draft.password = event.target.value;
                    draft.passwordError = "";
                });
                break;
            default:
                break;
        }
    };

    const validation: IFunc<boolean> = () => {
        let isValid = true;
        let emailError = "";
        let passwordError = "";

        if (!email?.trim()) {
            emailError = "Tài khoản email là bắt buộc";
            setState({ emailError: emailError });
            isValid = false;
        }

        if (!password?.trim()) {
            passwordError = "Mật khẩu là bắt buộc";
            setState({ passwordError: passwordError });
            isValid = false;
        }

        if (emailError || passwordError) {
            if (emailError) {
                emailRef.current?.focus();
            } else if (passwordError) {
                passwordRef.current?.focus();
            }
        }
        return isValid;
    };

    const handleClickShowPassword = () => setState({ showPassword: !state.showPassword });

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState({ emailError: "", passwordError: "", isLoading: true });
        if (!validation()) {
            setState({ isLoading: false });
            return;
        }
        const response = await AuthService.loginUser({ email, password });

        if (response.requestStatus === IRequestStatus.Error) {
            switch (response.fieldError) {
                case "email":
                    setState({ emailError: response.message, passwordError: "", isLoading: false });
                    emailRef.current?.focus();
                    break;
                case "password":
                    setState({ passwordError: response.message, emailError: "", isLoading: false });
                    passwordRef.current?.focus();
                    break;
                default:
                    break;
            }
        } else {
            setState({ isLoading: false });
            setTimeout(() => {
                localStorage.setItem("access_token", response.data?.accessToken!)
                dispatch(login(response.data))
                navigate("/");
            }, 1000);
        }
    };
    return (
        <AppLayout title={loginTitle}>
            <section className="g-auth-section">
                <div className="g-auth-section-row">
                    <div className="g-login-section-form">
                        <div className="g-login-section-form-label">
                            <Image src={logoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
                        </div>
                        <div className="g-login-section-form-description-label">
                            <Label bold title={"Đăng nhập vào Devblog"} className="g-login-section-description-label" />
                        </div>
                        <Box className="g-login-section-form-input-group" onSubmit={handleSubmit} component={"form"} noValidate autoComplete="off">
                            <TextField
                                id="g-login-section-input-username"
                                className="g-login-section-input-item"
                                name="email"
                                value={email}
                                type="text"
                                inputRef={emailRef}
                                errorMessage={emailError}
                                placeholder="Địa chỉ email"
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
                                id="g-login-section-input-password"
                                className="g-login-section-input-item"
                                name="password"
                                value={password}
                                type={showPassword ? "text" : "password"}
                                inputRef={passwordRef}
                                errorMessage={passwordError}
                                placeholder="Mật khẩu"
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
                                            marginRight: "0.75rem",
                                        }}
                                        position="end"
                                    >
                                        <IconButton
                                            style={{ padding: "6px 1rem" }}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
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
                                    height: 36,
                                }}
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    color: "#fff",
                                }}
                                isLoading={isLoading}
                                title={"Đăng nhập"}
                            />
                        </Box>
                        <div className="g-login-section-form-action">
                            <Link style={{ fontSize: 12.8 }} underline="hover" href="/" variant="body2">
                                Quên mật khẩu
                            </Link>
                            <Link style={{ fontSize: 12.8 }} underline="hover" href="/register" variant="body2">
                                Tạo tài khoản
                            </Link>
                        </div>
                        <Divider 
                            title="Đăng nhập bằng" 
                            textAlign="center" 
                            textFontSize={16} 
                            margin="16px 0" 
                        />
                        <GoogleAuth />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Login;
