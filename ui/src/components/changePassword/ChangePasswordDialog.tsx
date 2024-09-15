import React, { Fragment, useMemo, useRef } from 'react'
import { useImmerState } from '../../hook/useImmerState';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Alert, ISeverity } from '../common/alert/Alert';
import { IAction1, IFunc } from '../../types/Function';
import { DefaultButton } from '../common/button/defaultbutton/DefaultButton';
import "./index.scss"
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { AuthService } from '../../services/auth/AuthService';
import { IRequestStatus } from '../../types/IResponse';
import { delay } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';

interface IChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

interface IChangePasswordDialogState {
    currentPassword: string;
    newPassword: string;
    currentPasswordError: string;
    newPasswordError: string;
    isOpenAlert: boolean;
    message: string;
    isUpdating?: boolean;
}

const initialState: IChangePasswordDialogState = {
    currentPassword: "",
    newPassword: "",
    currentPasswordError: "",
    newPasswordError: "",
    isOpenAlert: false,
    message: "",
    isUpdating: false,
}

const ChangePasswordDialog: React.FunctionComponent<IChangePasswordDialogProps> = (props) => {
    const { onClose, open } = props
    const { handleUnauthorized } = useAuth()
    const { user } = useAppSelector(userState)
    const [state, setState] = useImmerState<IChangePasswordDialogState>(initialState)
    const { currentPassword, currentPasswordError, newPassword, newPasswordError, isOpenAlert, isUpdating, message } = state
    const currentPasswordRef = useRef<HTMLInputElement>();
    const newPasswordRef = useRef<HTMLInputElement>();

    const iconStyle: React.CSSProperties = useMemo(() => {
        return {
            width: 20,
            height: 20,
            color: "#fff",
        }
    }, [])

    const onChangeValue: IAction1<React.ChangeEvent<HTMLInputElement>> = (event) => {
        switch (event.target.name) {
            case "currentPassword":
                setState((draft) => {
                    draft.currentPassword = event.target.value;
                    draft.currentPasswordError = "";
                });
                break;
            case "newPassword":
                setState((draft) => {
                    draft.newPassword = event.target.value;
                    draft.newPasswordError = "";
                });
                break;
            default:
                break;
        }
    }

    const validation: IFunc<boolean> = () => {
        let isValid = true;
        let currentPasswordError = "";
        let newPasswordError = "";

        if (!currentPassword.trim()) {
            currentPasswordError = "Mật khẩu hiện tại là bắt buộc";
            setState({ currentPasswordError: currentPasswordError });
            isValid = false;
        }

        if (!newPassword.trim()) {
            newPasswordError = "Mật khẩu mới là bắt buộc";
            setState({ newPasswordError: newPasswordError });
            isValid = false;
        }

        if (currentPassword.trim() === newPassword.trim()) {
            newPasswordError = "Mật khẩu mới phải khác mật khẩu hiện tại";
            setState({ newPasswordError: newPasswordError });
            isValid = false;
        }

        if (currentPasswordError || newPasswordError) {
            if (currentPasswordError) {
                currentPasswordRef.current?.focus()
            } else if (newPasswordError) {
                newPasswordRef.current?.focus()
            }
        }
        return isValid;
    };

    const handleSubmit: IFunc<Promise<void>> = async () => {
        setState({ isUpdating: true })
        if (!validation()) {
            setState({ isUpdating: false })
            return Promise.resolve()
        }
        const updatedUser = await AuthService.updatePassword(user?._id!, {
            currentPassword: currentPassword,
            newPassword: newPassword
        }, handleUnauthorized)
        if (updatedUser.requestStatus === IRequestStatus.Error) {
            switch (updatedUser.fieldError) {
                case "currentPassword":
                    setState((draft) => {
                        draft.currentPasswordError = updatedUser.message;
                        draft.isUpdating = false;
                    })
                    currentPasswordRef.current?.focus()
                    break;
                case "newPassword":
                    setState((draft) => {
                        draft.newPasswordError = updatedUser.message;
                        draft.isUpdating = false;
                    })
                    newPasswordRef.current?.focus()
                    break;
                default:
                    break;
            }
        } else {
            setState((draft) => {
                draft.currentPassword = "";
                draft.newPassword = "";
                draft.message = updatedUser.message;
                draft.isUpdating = false;
                draft.isOpenAlert = true;
            })
            await delay(1000).then(() => {
                onClose()
            })
        }
    };

    return (<Fragment>
        <Dialog
            open={open}
            maxWidth={"sm"}
            className='g-change-password-dialog'
        >
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    type="password"
                    inputRef={currentPasswordRef}
                    value={currentPassword}
                    onChange={onChangeValue}
                    fullWidth
                    error={!!currentPasswordError}
                    helperText={currentPasswordError}
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="newPassword"
                    label="Mật khẩu mới"
                    type="password"
                    inputRef={newPasswordRef}
                    value={newPassword}
                    onChange={onChangeValue}
                    fullWidth
                    helperText={newPasswordError}
                    error={!!newPasswordError}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    className="g-update-form-cancel-button"
                    disabled={isUpdating}
                    onClick={onClose}
                >
                    Hủy
                </Button>
                <DefaultButton
                    variant="contained"
                    className='g-update-form-submit-button'
                    disabled={isUpdating}
                    iconStyle={iconStyle}
                    isLoading={isUpdating}
                    title={"Xác nhận"}
                    onClick={handleSubmit}
                />
            </DialogActions>
        </Dialog>
        {isOpenAlert && <Alert
            open={isOpenAlert}
            severity={ISeverity.success}
            message={message}
            onClose={() => setState({ isOpenAlert: false })}
        />}
    </Fragment>)
}

export default ChangePasswordDialog