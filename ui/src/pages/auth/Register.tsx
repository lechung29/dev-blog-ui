import React, { useMemo, useRef } from "react";
import "./index.scss";
import AppLayout from "../../layout/Layout";
import { useImmerState } from "../../hook/useImmerState";
import { useNavigate } from "react-router-dom";
import { logoSrc } from "../../components/utils/common/common";
import { Image, ImageFit } from "../../components/common/image/Image";
import { Label } from "../../components/common/label/Label";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { Box, IconButton, InputAdornment, Checkbox as CheckboxItem, Link } from "@mui/material";
import { TextField } from "../../components/common/textfield/TextField";
import { IAction1, IAction2, IFunc } from "../../types/Function";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox } from "../../components/common/checkbox/Checkbox";
import { Divider } from "../../components/common/divider/Divider";
import { GoogleAuth } from "../../components/Auth/GoogleAuth";
import { delay } from "../../utils/helper";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation()
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

    const onRenderTermsAndConditions = useMemo(() => {
        return (
            <div className="g-register-term-condition">
                <span className="g-checkbox-policy-label">{t("Common.Accept")} </span>
                <Link
                    underline="none"
                    href="/"
                    variant="body2"
                >
                    {t("Common.Policy")}
                </Link>
            </div>
        )
    }, [t])

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
            emailError = t("Error.Required.Email");
            setState({ emailError: emailError });
            isValid = false;
        }

        if (!displayName?.trim()) {
            displayNameError = t("Error.Required.DisplayName");
            setState({ displayNameError: displayNameError });
            isValid = false;
        }

        if (!password?.trim()) {
            passwordError = t("Error.Required.Password");
            setState({ passwordError: passwordError });
            isValid = false;
        }

        if (!confirmPassword?.trim()) {
            confirmPasswordError = t("Error.Required.Confirm.Password");
            setState({ confirmPasswordError: confirmPasswordError });
            isValid = false;
        } else if (confirmPassword?.trim() !== password?.trim()) {
            confirmPasswordError = t("Error.Password.Not.Match");
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
                setShow((prev) => ({ ...prev, password: !prev.password }));
                break;
            case "confirmPassword":
                setShow((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }));
                break;
            default:
                break;
        }
    }

    const handleMouseDownPassword: IAction1<React.MouseEvent<HTMLButtonElement>> = (event) => {
        event.preventDefault();
    };

    const onPolicyCheckboxChange: IAction2<React.SyntheticEvent, boolean> = (_, checked) => {
        setShow((prev) => ({ ...prev, checked: checked }))
        if (checked) {
            setState({ policyCheckboxErrorMessage: "" })
        } else {
            setState({ policyCheckboxErrorMessage: t("Warning.Accept.Policy") })
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState({ emailError: "", passwordError: "", isLoading: true });
        if (!validation()) {
            setState({ isLoading: false });
            return;
        }

        try {
            const data = await AuthService.registerUser({ email, displayName, password });
            setState({ isLoading: false });
            if (data.requestStatus === IRequestStatus.Error) {
                switch (data.fieldError) {
                    case "email":
                        setState({ emailError: t(data.message), passwordError: "", displayNameError: "", isLoading: false });
                        emailRef.current?.focus();
                        break;
                    case "displayName":
                        setState({ displayNameError: t(data.message), emailError: "", passwordError: "", isLoading: false });
                        displayNameRef.current?.focus();
                        break;
                    case "password":
                        setState({ passwordError: t(data.message), emailError: "", displayNameError: "", isLoading: false });
                        passwordRef.current?.focus();
                        break;
                    default:
                        break;
                }
            } else {
                await delay(2000).then(() => navigate("/login"))
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <AppLayout title={t("SignUpPage.Title")}>
            <div className="g-auth-section">
                <div className="g-auth-section-row">
                    <div className="g-register-section-logo">
                        <Image
                            src={logoSrc}
                            objectFit={ImageFit.COVER}
                            width={logoWidth}
                            height={logoHeight}
                            alt={"logo"}
                        />
                    </div>
                    <div className="g-register-section-form">
                        <div className="g-register-section-form-description-label">
                            <Label
                                className="g-register-section-description-label"
                                title={t("Create.Account")}
                            />
                        </div>
                        <div className="g-register-section-form-description-content">
                            <Label
                                className="g-register-section-description-content"
                                title={t("Create.Account.Description")}
                                subTitle={t("Devblog.Platform")}
                                subTitleStyle={{ fontWeight: 600 }}
                            />
                        </div>
                        <Box
                            className="g-register-section-form-input-group"
                            component={"form"}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <div className="g-register-section-form-input-row">
                                <TextField
                                    id="g-register-section-input-username"
                                    className="g-register-section-input-row-item"
                                    name="email"
                                    value={email}
                                    type="text"
                                    inputRef={emailRef}
                                    errorMessage={emailError}
                                    placeholder={t("Email.Address")}
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
                                    placeholder={t("Common.DisplayName")}
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
                                    placeholder={t("Password")}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment
                                            className="g-password-end-adornment"
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
                                    placeholder={t("Common.Confirm.Password")}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment
                                            className="g-password-end-adornment"
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
                                onChange={onPolicyCheckboxChange}
                                control={<CheckboxItem />}
                                errorMessage={policyCheckboxErrorMessage}
                                label={onRenderTermsAndConditions}
                            />
                            <DefaultButton
                                className="g-register-button"
                                variant="contained"
                                type="submit"
                                disabled={disableButton}
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    color: "#fff",
                                }}
                                isLoading={isLoading}
                                title={t("Common.SignUp")}
                            />
                        </Box>
                        <Divider
                            title={t("Common.Login.By")}
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
