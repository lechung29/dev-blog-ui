/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Dialog, DialogContent, DialogProps, DialogTitle, FormControl, FormHelperText, Input, InputAdornment, InputLabel, Stack, Step, StepContent, StepLabel, Stepper, TextField } from '@mui/material';
import React, { Fragment, useRef } from 'react'
import "./index.scss"
import { IconButton } from '../common/button/iconbutton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useImmerState } from '../../hook/useImmerState';
import { IAction, IAction1, IFunc } from '../../types/Function';
import { AuthService } from '../../services/auth/AuthService';
import { IRequestStatus } from '../../types/IResponse';
import OTPInput from '../otpInput/OTPInput';
import { delay } from '../../utils/helper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton as BaseIconButton } from '@mui/material';
import { Alert, ISeverity } from '../common/alert/Alert';
import { DefaultButton } from '../common/button/defaultbutton/DefaultButton';

export interface IForgotPasswordProps {
    open: boolean;
    onClose: () => void;
}

export interface IForgotPasswordStep {
    label: string;
    buttonTitle: string;
    onNextStep: IFunc<Promise<void> | void>
    renderContent: () => React.ReactNode
}

interface IForgotPasswordState {
    disableEmailInput: boolean;
    disablePasswordInput: boolean;
    activeStep: number;
    message: string;
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    isLoading: boolean;
    isDisabledEmail: boolean;
    isDisabledOTP: boolean;
    isDisabledPassword: boolean
    isDisabledResendOtp: boolean;
    showPassword: boolean,
    isAlertOpen: boolean;
    alertType: ISeverity;
}

const initialState: IForgotPasswordState = {
    disableEmailInput: false,
    disablePasswordInput: false,
    activeStep: 0,
    message: "",
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    isLoading: false,
    isDisabledResendOtp: false,
    isDisabledEmail: true,
    isDisabledOTP: true,
    isDisabledPassword: true,
    showPassword: false,
    isAlertOpen: false,
    alertType: ISeverity.success,
}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation()
    const maxWidth: DialogProps["maxWidth"] = "sm"
    const [state, setState] = useImmerState<IForgotPasswordState>(initialState);
    const {
        email,
        emailError,
        passwordError,
        isDisabledEmail,
        isDisabledResendOtp,
        isDisabledOTP,
        isDisabledPassword,
        activeStep,
        disableEmailInput,
        disablePasswordInput,
        password,
        showPassword,
        alertType,
        isAlertOpen,
        message,
        isLoading
    } = state;
    const [otp, setOtp] = React.useState<string>("")
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    //#region send otp

    const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setState((draft) => {
            draft.email = event.target.value;
        })
        onCheckEmailDisabled(event.target.value)
    }

    const onCheckEmailDisabled: IAction1<string> = (value) => {
        if (value) {
            setState((draft) => {
                draft.isDisabledEmail = false;
                draft.emailError = ""
            })
        } else {
            setState((draft) => {
                draft.isDisabledEmail = true;
                draft.emailError = "Error.Required.Email"
            })
            emailRef.current?.focus()
        }
    }

    const handleSendOtp: IFunc<Promise<void>> = () => {
        setState({ isDisabledEmail: true, isLoading: true, disableEmailInput: true })
        return Promise.all([AuthService.sendOtp(email), delay(1500)])
            .then(([data, _other]) => {
                setState({ isLoading: false })
                if (data.requestStatus === IRequestStatus.Success) {
                    setState((draft) => {
                        draft.message = data.message
                        draft.alertType = ISeverity.success
                        draft.isAlertOpen = true
                        draft.activeStep = activeStep + 1
                    })
                } else if (data.requestStatus === IRequestStatus.Error) {
                    setState((draft) => {
                        draft.emailError = data.message;
                        draft.isDisabledEmail = false
                        draft.disableEmailInput = false
                    })
                    emailRef.current?.focus()
                }
            }).catch((error) => console.log(error))
    }

    //#endregion send otp

    //#region verify otp


    React.useEffect(() => {
        if (otp.length === 4) {
            setState({ isDisabledOTP: false })
        } else {
            setState({ isDisabledOTP: true })
        }
    }, [otp])

    const handleResendOtp: IFunc<Promise<void>> = () => {
        setState({ isDisabledResendOtp: true })
        return Promise.all([AuthService.resendOtp(email), delay(1500)])
            .then(([data, _other]) => {
                setState((draft) => {
                    draft.isDisabledResendOtp = false
                    draft.message = data.message
                    draft.alertType = ISeverity.success
                    draft.isAlertOpen = true
                })
            })
    }

    const verifyOtp: IFunc<Promise<void>> = () => {
        setState({ isDisabledOTP: true, isLoading: true })
        return Promise.all([AuthService.verifyOtp(email, otp), delay(1500)])
            .then(([data, _other]) => {
                setState({ isLoading: false })
                if (data.requestStatus === IRequestStatus.Success) {
                    setState((draft) => {
                        draft.message = data.message;
                        draft.alertType = ISeverity.success
                        draft.isAlertOpen = true
                        draft.activeStep = activeStep + 1
                    })
                } else if (data.requestStatus === IRequestStatus.Error) {
                    setState((draft) => {
                        draft.message = data.message;
                        draft.alertType = ISeverity.error
                        draft.isAlertOpen = true
                        draft.isDisabledOTP = false
                    })
                }
            }).catch((error) => console.log(error))
    }

    //#endregion verify otp

    //#region change password

    const handleClickShowPassword: IAction = () => {
        setState({ showPassword: !state.showPassword })
    }


    const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setState((draft) => {
            draft.password = event.target.value;
        })
        onCheckPasswordDisabled(event.target.value)
    }

    const onCheckPasswordDisabled: IAction1<string> = (value) => {
        if (value) {
            setState((draft) => {
                draft.isDisabledPassword = false;
                draft.passwordError = ""
            })
        } else {
            setState((draft) => {
                draft.isDisabledPassword = true;
                draft.passwordError = "Error.Required.Password"
            })
            emailRef.current?.focus()
        }
    }

    const resetPassword: IFunc<Promise<void>> = () => {
        setState({ isDisabledPassword: true, isLoading: true, disablePasswordInput: true })
        return Promise.all([AuthService.resetPassword(email, password), delay(1500)])
            .then(([data, _other]) => {
                setState({ isLoading: false })
                if (data.requestStatus === IRequestStatus.Success) {
                    setState((draft) => {
                        draft.message = data.message;
                        draft.alertType = ISeverity.success
                        draft.isAlertOpen = true
                        draft.activeStep = activeStep + 1
                    })

                    delay(2000).then(() => onClose())
                } else if (data.requestStatus === IRequestStatus.Error) {
                    setState((draft) => {
                        draft.passwordError = data.message;
                        draft.isDisabledPassword = false
                        draft.disablePasswordInput = false
                    })
                    passwordRef.current?.focus()
                }
            }).catch((error) => console.log(error))
    }



    //#region render element

    const getDisabledButton: IFunc<boolean> = () => {
        switch (activeStep) {
            case 0:
                return isDisabledEmail;
            case 1:
                return isDisabledOTP;
            case 2:
                return isDisabledPassword;
            default:
                return true;
        }
    }

    const steps: IForgotPasswordStep[] = [
        {
            label: "Label.Send.OTP",
            buttonTitle: "Label.Send",
            onNextStep: handleSendOtp,
            renderContent() {
                return <TextField
                    error={!!emailError}
                    disabled={disableEmailInput}
                    onChange={onChangeEmail}
                    className='g-forgot-password-email-input'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.onNextStep();
                        }
                    }}
                    label={t("Email.Address")}
                    inputRef={emailRef}
                    value={email}
                    helperText={t(emailError)}
                    variant="standard"
                />
            },
        },
        {
            label: "Label.Verify.OTP",
            buttonTitle: "Label.Verify",
            onNextStep: verifyOtp,
            renderContent() {
                return <Stack className='g-forgot-password-otp-input'>
                    <div className='g-forgot-password-otp-input-form'>
                        <OTPInput
                            length={4}
                            value={otp}
                            onChange={setOtp}
                            separator={<Fragment />}
                        />
                    </div>
                    <Button
                        disabled={isDisabledResendOtp}
                        variant="text"
                        className='g-forgot-password-otp-resend'
                        onClick={handleResendOtp}
                    >
                        {t("Button.Resend.OTP")}
                    </Button>
                </Stack>
            },
        },
        {
            label: "Change.Password",
            buttonTitle: "Confirm.Password.And.Finish",
            onNextStep: resetPassword,
            renderContent() {
                return <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <InputLabel error={!!passwordError} htmlFor="standard-adornment-password">{t("Password")}</InputLabel>
                    <Input
                        error={!!passwordError}
                        disabled={disablePasswordInput}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={onChangePassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.onNextStep();
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <BaseIconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </BaseIconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error={!!passwordError} id="standard-adornment-password-helper-text">{t(passwordError)}</FormHelperText>
                </FormControl>
            },
        },
    ];

    //#endregion render element

    return (
        <div className='g-forgot-password-dialog'>
            <Dialog
                fullWidth
                maxWidth={maxWidth}
                open={open}
            >
                <Stack className='g-forgot-password-header-section'>
                    <DialogTitle className='g-forgot-password-header-title'>{t("Common.Forgot.Password")}</DialogTitle>
                    <IconButton
                        size='large'
                        className='g-forgot-password-header-close'
                        icon={<CloseIcon style={{ color: "ThreeDDarkShadow" }} />}
                        onClick={onClose}
                    />
                </Stack>
                <DialogContent style={{ paddingBottom: 16, height: 360 }}>
                    <Box>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label + index}>
                                    <StepLabel className='g-forgot-password-step-title'>{t(step.label)}</StepLabel>
                                    <StepContent>
                                        {step.renderContent()}
                                        <Box sx={{ mt: 2 }}>
                                            <DefaultButton
                                                title={t(step.buttonTitle)}
                                                className='g-forgot-password-action-button'
                                                disabled={getDisabledButton()}
                                                variant="contained"
                                                isLoading={isLoading}
                                                iconStyle={{
                                                    width: 20,
                                                    height: 20,
                                                    color: "#000",
                                                }}
                                                onClick={step.onNextStep}
                                                sx={{ mt: 1, mr: 1 }}
                                            />
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </DialogContent>
            </Dialog>
            {isAlertOpen && <Alert
                open={isAlertOpen}
                severity={alertType}
                message={t(message)}
                onClose={() => setState({ isAlertOpen: false })}
            />}
        </div>
    )
}

export default ForgotPassword