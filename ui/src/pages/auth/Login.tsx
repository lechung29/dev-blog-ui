import React, { useRef } from "react";
import AppLayout from "../../layout/Layout";
import { logoSrc } from "../../components/utils/common/common";
import { Label } from "../../components/common/label/Label";
import { Image, ImageFit } from "../../components/common/image/Image";
import { TextField } from "../../components/common/textfield/TextField";
import { Box, IconButton, InputAdornment, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { useImmerState } from "../../hook/useImmerState";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { IAction, IAction1, IFunc } from "../../types/Function";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "../../components/Auth/GoogleAuth";
import { Divider } from "../../components/common/divider/Divider";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/users/UserSlice";
import { delay } from "../../utils/helper";
import { IRequestStatus } from "../../types/IResponse";
import { useTranslation } from "react-i18next";

interface ILoginOwnProps { }

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
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [state, setState] = useImmerState<ILoginFormState>(inititalState);
    const { email, password, emailError, passwordError, showPassword, isLoading } = state;
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();


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
            emailError = t("Error.Required.Email");
            setState({ emailError: emailError });
            isValid = false;
        }

        if (!password?.trim()) {
            passwordError =t("Error.Required.Password");
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

    const handleClickShowPassword: IAction = () => {
        setState({ showPassword: !state.showPassword })
    };

    const handleMouseDownPassword: IAction1<React.MouseEvent<HTMLButtonElement>> = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState({ emailError: "", passwordError: "", isLoading: true });
        if (!validation()) {
            setState({ isLoading: false });
            return Promise.resolve()
        }

        try {
            const response = await AuthService.loginUser({ email, password });
            setState({ isLoading: false });
            if (response.requestStatus === IRequestStatus.Error) {
                switch (response.fieldError) {
                    case "email":
                        setState({ emailError: t(response.message), passwordError: "", isLoading: false });
                        emailRef.current?.focus();
                        break;
                    case "password":
                        setState({ passwordError: t(response.message), emailError: "", isLoading: false });
                        passwordRef.current?.focus();
                        break;
                    default:
                        break;
                }
            } else {
                await delay(1000).then(() => {
                    dispatch(login(response.data!))
                    navigate("/");
                })
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    return (
        <AppLayout title={t("LoginPage.Title")}>
            <section className="g-auth-section">
                <div className="g-auth-section-row">
                    <div className="g-login-section-form">
                        <div className="g-login-section-form-label">
                            <Image
                                src={logoSrc}
                                objectFit={ImageFit.COVER}
                                width={logoWidth}
                                height={logoHeight}
                                alt={"logo"}
                            />
                        </div>
                        <div className="g-login-section-form-description-label">
                            <Label
                                bold
                                title={t("Devblog.Login")}
                                className="g-login-section-description-label"
                            />
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
                                placeholder={t("Email.Address")}
                                onChange={onChange}
                                startAdornment={
                                    <InputAdornment
                                        className="g-password-start-adornment"
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
                                placeholder={t("Password")}
                                onChange={onChange}
                                startAdornment={
                                    <InputAdornment
                                        className="g-password-start-adornment"
                                        position="start"
                                    >
                                        <KeyIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment
                                        className="g-password-end-adornment"
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
                                className="g-login-button"
                                variant="contained"
                                type="submit"
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    color: "#fff",
                                }}
                                isLoading={isLoading}
                                title={t("Common.Login")}
                            />
                        </Box>
                        <div className="g-login-section-form-action">
                            <Link
                                style={{ fontSize: 12.8 }}
                                underline="hover"
                                href="/"
                                variant="body2"
                            >
                                {t("Common.Forgot.Password")}
                            </Link>
                            <Link
                                style={{ fontSize: 12.8 }}
                                underline="hover"
                                href="/register"
                                variant="body2"
                            >
                                {t("Common.Create.Account")}
                            </Link>
                        </div>
                        <Divider
                            title={t("Common.Login.By")}
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
