import React, { useMemo, useRef } from "react";
import "./index.scss";
import AppLayout from "../../layout/Layout";
import { useImmerState } from "../../hook/useImmerState";
import { useNavigate } from "react-router-dom";
import { logoSrc, registerDescription, registerHighlightDes, signUpTitle } from "../../components/utils/common/common";
import { Image, ImageFit } from "../../components/common/image/Image";
import { Label } from "../../components/common/label/Label";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { Box, IconButton, InputAdornment, Checkbox as CheckboxItem, Link } from "@mui/material";
import { TextField } from "../../components/common/textfield/TextField";
import { IAction1, IFunc } from "../../types/Function";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox } from "../../components/common/checkbox/Checkbox";
import { Divider } from "../../components/common/divider/Divider";
import { GoogleAuth } from "../../components/Auth/GoogleAuth";

type ISignUpOwnProps = {};

interface ISignUpFormState {
    email: string;
    displayName: string;
    password: string;
    confirmPassword: string;
    emailError: string;
    displayNameError: string;
    passwordError: string;
    confirmPasswordError: string;
    policyCheckboxErrorMessage: string;
    isLoading?: boolean;
}

interface IIconState {
    password: boolean;
    confirmPassword: boolean;
    checked: boolean;
}

const inititalState: ISignUpFormState = {
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    emailError: "",
    displayNameError: "",
    passwordError: "",
    confirmPasswordError: "",
    policyCheckboxErrorMessage: "",
    isLoading: false,
};

const SignUpView: React.FunctionComponent<ISignUpOwnProps> = (props) => {
    const logoHeight: Readonly<number> = 75;
    const logoWidth: Readonly<number> = 350;
    const [state, setState] = useImmerState<ISignUpFormState>(inititalState);
    const { email, displayName, password, confirmPassword, emailError, displayNameError, passwordError, confirmPasswordError, policyCheckboxErrorMessage, isLoading } = state;
    const emailRef = useRef<HTMLInputElement>();
    const displayNameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const confirmPasswordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [show, setShow] = useImmerState<IIconState>({
        password: false,
        confirmPassword: false,
        checked: false
    })

    const onRenderTermsAndConditions: IFunc<JSX.Element> = () => {
        return (
            <p style={{textWrap: "wrap"}}>
                <span className="g-checkbox-policy-label">Tôi đồng ý </span>
                <Link style={{ fontSize: 13 }} underline="hover" href="/" variant="body2">
                    Điều khoản và dịch vụ của Devblog
                </Link>
            </p>
        )
    }

    const disableButton: boolean = useMemo(() => {
        return !show.checked
    }, [show.checked])
    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        switch (event.target.name) {
            case "email":
                setState((draft) => {
                    draft.email = event.target.value;
                    draft.emailError = "";
                });
                break;
            case "displayName":
                setState((draft) => {
                    draft.displayName = event.target.value;
                    draft.displayNameError = "";
                });
                break;
            case "password":
                setState((draft) => {
                    draft.password = event.target.value;
                    draft.passwordError = "";
                });
                break;
            case "confirmPassword":
                setState((draft) => {
                    draft.confirmPassword = event.target.value;
                    draft.confirmPasswordError = "";
                });
                break;
            default:
                break;
        }
    };

    const validation: IFunc<boolean> = () => {
        let isValid = true;
        let emailError = "";
        let displayNameError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!email?.trim()) {
            emailError = "Tài khoản email là bắt buộc";
            setState({ emailError: emailError });
            isValid = false;
        }

        if (!displayName?.trim()) {
            displayNameError = "Tên hiển thị là bắt buộc";
            setState({ displayNameError: displayNameError });
            isValid = false;
        }

        if (!password?.trim()) {
            passwordError = "Mật khẩu là bắt buộc";
            setState({ passwordError: passwordError });
            isValid = false;
        }

        if (!confirmPassword?.trim()) {
            confirmPasswordError = "Xác nhận mật khẩu là bắt buộc";
            setState({ confirmPasswordError: confirmPasswordError });
            isValid = false;
        } else if (confirmPassword?.trim() !== password?.trim()) {
            confirmPasswordError = "Mật khẩu xác nhận không trùng khớp";
            setState({ confirmPasswordError: confirmPasswordError });
            isValid = false;
        }

        if (emailError || displayNameError || passwordError || confirmPasswordError) {
            if (emailError) {
                emailRef.current?.focus();
            } else if (displayNameError) {
                displayNameRef.current?.focus();
            } else if (passwordError) {
                passwordRef.current?.focus();
            } else if (confirmPasswordError) {
                confirmPasswordRef.current?.focus();
            }
        }
        return isValid;
    };

    const handleClickShowPassword: IAction1<string> = (type) => {
        switch (type) {
            case "password":
                setShow((prev) => ({...prev, password:!prev.password }));
                break;
            case "confirmPassword":
                setShow((prev) => ({...prev, confirmPassword:!prev.confirmPassword }));
                break;
            default:
                break;
        }
    }

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
        const data = await AuthService.registerUser({ email, displayName, password });
        if (data.requestStatus === IRequestStatus.Error) {
            switch (data.fieldError) {
                case "email":
                    setState({ emailError: data.message, passwordError: "", displayNameError: "", isLoading: false });
                    emailRef.current?.focus();
                    break;
                case "displayName":
                    setState({ displayNameError: data.message, emailError: "", passwordError: "", isLoading: false });
                    displayNameRef.current?.focus();
                    break;
                case "password":
                    setState({ passwordError: data.message, emailError: "", displayNameError: "", isLoading: false });
                    passwordRef.current?.focus();
                    break;
                default:
                    break;
            }
        } else {
            setState({ isLoading: false });
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    };

    return (
        <AppLayout title={signUpTitle}>
            <div className="g-auth-section">
                <div className="g-auth-section-row">
                    <div className="g-register-section-logo">
                        <Image src={logoSrc} objectFit={ImageFit.COVER} width={logoWidth} height={logoHeight} alt={"logo"} />
                    </div>
                    <div className="g-register-section-form">
                        <div className="g-register-section-form-description-label">
                            <Label title={"Đăng ký tài khoản Devblog"} className="g-register-section-description-label" />
                        </div>
                        <div className="g-register-section-form-description-content">
                            <Label 
                                title={registerDescription} 
                                subTitle={registerHighlightDes} 
                                subTitleStyle={{fontWeight: 600}} 
                                className="g-register-section-description-content" 
                            />
                        </div>
                        <Box className="g-register-section-form-input-group" onSubmit={handleSubmit} component={"form"} noValidate autoComplete="off">
                            <div className="g-register-section-form-input-row">
                                <TextField
                                    id="g-register-section-input-username"
                                    className="g-register-section-input-row-item"
                                    name="email"
                                    value={email}
                                    type="text"
                                    inputRef={emailRef}
                                    errorMessage={emailError}
                                    placeholder="Địa chỉ email"
                                    onChange={onChange}

                                />
                                <TextField
                                    id="g-register-section-input-password"
                                    className="g-register-section-input-row-item"
                                    name="displayName"
                                    value={displayName}
                                    type={"text"}
                                    inputRef={displayNameRef}
                                    errorMessage={displayNameError}
                                    placeholder="Tên hiển thị"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="g-register-section-form-input-row">
                                <TextField
                                    id="g-register-section-input-password"
                                    className="g-register-section-input-row-item"
                                    name="password"
                                    value={password}
                                    type={show.password ? "text" : "password"}
                                    inputRef={passwordRef}
                                    errorMessage={passwordError}
                                    placeholder="Mật khẩu"
                                    onChange={onChange}
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
                                                onClick={() => handleClickShowPassword("password")}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {show.password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                            <div className="g-register-section-form-input-row">
                                <TextField
                                    id="g-register-section-input-confirmPassword"
                                    className="g-register-section-input-row-item"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    type={show.confirmPassword ? "text" : "password"}
                                    inputRef={confirmPasswordRef}
                                    errorMessage={confirmPasswordError}
                                    placeholder="Xác nhận mật khẩu"
                                    onChange={onChange}
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
                                                onClick={() => handleClickShowPassword("confirmPassword")}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {show.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                            <Checkbox 
                                className="g-checkbox-policy"
                                checked={show.checked} 
                                onChange={(_, checked) => {
                                    setShow((prev) => ({...prev, checked: checked}))
                                    if (checked) {
                                        setState({policyCheckboxErrorMessage: ""})
                                    } else {
                                        setState({policyCheckboxErrorMessage: "Vui lòng đồng ý với Điều khoản dịch vụ của chúng tôi"})
                                    }
                                }}
                                control={<CheckboxItem />}
                                errorMessage={policyCheckboxErrorMessage}
                                label={onRenderTermsAndConditions()} 
                            />
                            <DefaultButton
                                variant="contained"
                                type="submit"
                                disabled={disableButton}
                                style={{
                                    backgroundColor: "#409eff",
                                    textTransform: "capitalize",
                                    fontSize: 13,
                                    height: 36,
                                    marginBottom: "1rem"
                                }}
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    color: "#fff",
                                }}
                                isLoading={isLoading}
                                title={"Đăng ký"}
                            />
                        </Box>
                        <Divider 
                                title="Đăng nhập bằng" 
                                textAlign="center" 
                                textFontSize={16} 
                                margin="16px 0" 
                            />
                        <GoogleAuth />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export { SignUpView as SignUp };
