/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from "react";
import AppLayout from "../../layout/Layout";
import { Avatar, Box, Container, Grid, Stack, TextField } from "@mui/material";
import "./index.scss";
import { Label } from "../../components/common/label/Label";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { useImmerState } from "../../hook/useImmerState";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import ChangePasswordDialog from "../../components/changePassword/ChangePasswordDialog";
import { updateUser, userState } from "../../redux/reducers/users/UserSlice";
import uploadToCloudinary from "../../services/helpers/upload";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { delay } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { Alert, ISeverity } from "../../components/common/alert/Alert";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
interface IProfilePageOwnProps { }

interface IProfilePageState {
    isUpdating: boolean;
    isDisabled: boolean;
    imageFileUrl: string;
    displayName: string;
    displayNameError: string;
    email: string;
    emailError: string;
    isOpenChangePassword?: boolean;
    isOpenAlert: boolean;
    message: string;
}

const Profile: React.FunctionComponent<IProfilePageOwnProps> = (_props) => {
    const { user } = useAppSelector(userState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { handleUnauthorized } = useAuth()
    const initialState: IProfilePageState = {
        imageFileUrl: user?.avatar || "",
        displayName: user?.displayName || "",
        email: user?.email || "",
        displayNameError: "",
        emailError: "",
        isUpdating: false,
        isOpenChangePassword: false,
        isDisabled: false,
        isOpenAlert: false,
        message: "",
    };
    const [state, setState] = useImmerState<IProfilePageState>(initialState);
    const { isUpdating, displayName, email, imageFileUrl, isOpenChangePassword, displayNameError, emailError, isDisabled, isOpenAlert, message } = state
    const avatarPickerRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement>();
    const displayNameRef = useRef<HTMLInputElement>();
    const { t } = useTranslation()

    const iconStyle: React.CSSProperties = useMemo(() => {
        return {
            width: 20,
            height: 20,
            color: "#fff",
        }
    }, [])


    const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        switch (event.target.name) {
            case "displayName":
                setState((draft) => {
                    draft.displayName = event.target.value;
                    draft.displayNameError = "";
                    draft.isDisabled = false
                });
                break;
            case "email":
                setState((draft) => {
                    draft.email = event.target.value;
                    draft.emailError = "";
                    draft.isDisabled = false
                });
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        if (displayName === user?.displayName && email === user.email && imageFileUrl === user.avatar) {
            setState({ isDisabled: true })
        }
    }, [imageFileUrl, displayName, email])


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadToCloudinary(file);
            setState((draft) => {
                draft.imageFileUrl = url;
                draft.isDisabled = false
            });
        }
    };


    const handleSubmit = async () => {
        setState({ isUpdating: true })
        try {
            const updatedUser = await AuthService.updateUserInfo(user?._id!, {
                avatar: imageFileUrl,
                displayName: displayName,
                email: email
            }, handleUnauthorized)

            if (updatedUser.requestStatus === IRequestStatus.Error) {
                switch (updatedUser.fieldError) {
                    case "email":
                        setState((draft) => {
                            draft.emailError = t(updatedUser.message)
                            draft.isUpdating = false
                        });
                        emailRef.current?.focus();
                        break;
                    case "displayName":
                        setState((draft) => {
                            draft.displayNameError = t(updatedUser.message)
                            draft.isUpdating = false
                        });
                        displayNameRef.current?.focus();
                        break;
                    default:
                        break;
                }
            } else {
                dispatch(updateUser(updatedUser.data));
                await delay(1000).then(() => {
                    setState((draft) => {
                        draft.isUpdating = false;
                        draft.isOpenAlert = true;
                        draft.message = t(updatedUser.message)
                    });
                })
                await delay(2000).then(() => {
                    navigate("/")
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppLayout title={t("InformationPage.Title")}>
            <Container className="g-profile-section">
                <Box
                    className="g-profile-update-form"
                    component={"section"}
                >
                    <Stack className="g-profile-title-section">
                        <Label
                            className="g-profile-primary-title"
                            title={t("Common.Personal.Information")}
                            bold
                        />
                        <Label
                            className="g-profile-sub-title"
                            title={t("Personal.Information.Management")}
                            bold
                        />
                    </Stack>
                    <Stack className="g-profile-content">
                        <Box className="g-profile-content-form">
                            <Stack className="g-profile-content-image">
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                    ref={avatarPickerRef}
                                />
                                <div onClick={() => avatarPickerRef.current?.click()}>
                                    <Avatar
                                        alt={displayName}
                                        src={imageFileUrl || user?.avatar}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </div>
                            </Stack>
                            <Grid
                                className="g-update-field-container"
                                container
                                rowSpacing={2}
                                columnSpacing={2}
                            >
                                <Grid className="g-update-field-label" item xs={4} md={3}>
                                    <Label title={t("Common.Your.Id")} />
                                </Grid>
                                <Grid className="g-update-field-input" item xs={8} md={9}>
                                    <TextField
                                        id="g-update-field-id"
                                        className="g-update-section-input-item"
                                        size="small"
                                        disabled
                                        value={user?._id}
                                    />
                                </Grid>
                                <Grid className="g-update-field-label" item xs={4} md={3}>
                                    <Label title={t("Common.DisplayName")} />
                                </Grid>
                                <Grid className="g-update-field-input" item xs={8} md={9}>
                                    <TextField
                                        id="g-update-field-displayname"
                                        className="g-update-section-input-item"
                                        name="displayName"
                                        size="small"
                                        value={displayName}
                                        inputRef={displayNameRef}
                                        onChange={onChangeValue}
                                        helperText={displayNameError}
                                        error={!!displayNameError}
                                    />
                                </Grid>
                                <Grid className="g-update-field-label" item xs={4} md={3}>
                                    <Label title={t("Email.Address")} />
                                </Grid>
                                <Grid className="g-update-field-input" item xs={8} md={9}>
                                    <TextField
                                        id="g-update-field-email"
                                        className="g-update-section-input-item"
                                        size="small"
                                        name="email"
                                        value={email}
                                        onChange={onChangeValue}
                                        inputRef={emailRef}
                                        helperText={emailError}
                                        error={!!emailError}
                                    />
                                </Grid>
                            </Grid>
                            <Stack className="g-update-button-container">
                                <DefaultButton
                                    disabled={isUpdating}
                                    className="g-change-password-button"
                                    title={t("Change.Password")}
                                    onClick={() => setState({ isOpenChangePassword: true })}
                                />

                                {isOpenChangePassword && (
                                    <ChangePasswordDialog
                                        open={isOpenChangePassword}
                                        onClose={() => setState({ isOpenChangePassword: false })}
                                    />
                                )}

                                <DefaultButton
                                    disabled={isDisabled}
                                    isLoading={isUpdating}
                                    className="g-update-button"
                                    title={t("Common.Update")}
                                    iconStyle={iconStyle}
                                    onClick={handleSubmit}
                                />

                                {isOpenAlert && <Alert
                                    open={isOpenAlert}
                                    severity={ISeverity.success}
                                    message={message}
                                    onClose={() => setState({ isOpenAlert: false })}
                                />}
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </AppLayout>
    );
};

export default Profile;
