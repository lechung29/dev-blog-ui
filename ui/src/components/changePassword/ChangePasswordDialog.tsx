import React, { Fragment, useRef } from 'react'
import { useImmerState } from '../../hook/useImmerState';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Alert } from '../common/alert/Alert';
import { IFunc } from '../../types/Function';
import { DefaultButton } from '../common/button/defaultbutton/DefaultButton';
import "./index.scss"

interface IChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

interface IChangePasswordDialogState {
    currentPassword: string;
    newPassword: string;
    currentPasswordError: string;
    newPasswordError: string;
    isOpenAlert?: boolean;
    message?: string;
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
    const [state, setState] = useImmerState<IChangePasswordDialogState>(initialState)
    const currentPasswordRef = useRef<HTMLInputElement>();
    const newPasswordRef = useRef<HTMLInputElement>();

    const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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

        if (!state.currentPassword.trim()) {
            currentPasswordError = "Mật khẩu hiện tại là bắt buộc";
            setState({currentPasswordError: currentPasswordError});
            isValid = false;
        }

        if (!state.newPassword.trim()) {
            newPasswordError = "Mật khẩu mới là bắt buộc";
            setState({newPasswordError: newPasswordError});
            isValid = false;
        }

        if (state.currentPassword.trim() === state.newPassword.trim()) {
            newPasswordError = "Mật khẩu mới phải khác mật khẩu hiện tại";
            setState({newPasswordError: newPasswordError});
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

    const handleSubmit = async () => {
        setState({isUpdating: true})
        if (!validation()) {
            setState({isUpdating: false})
            return;
        }
        console.log("current: ", state.currentPassword)
        console.log("new: ", state.newPassword)
        setState({isOpenAlert: true})
        setTimeout(() => {
            setState({isUpdating: false})
        }, 2000)
    };

    return ( <Fragment>
        <Dialog
            open={props.open}
            maxWidth={"sm"}
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
                    value={state.currentPassword}
                    onChange={onChangeValue}
                    fullWidth
                    error={!!state.currentPasswordError}
                    helperText={state.currentPasswordError}
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    name="newPassword"
                    label="Mật khẩu mới"
                    type="password"
                    inputRef={newPasswordRef}
                    value={state.newPassword}
                    onChange={onChangeValue}
                    fullWidth
                    helperText={state.newPasswordError}
                    error={!!state.newPasswordError}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={state.isUpdating} style={{textTransform: "none"}} onClick={props.onClose}>Hủy</Button>
                <DefaultButton
                    variant="contained"
                    disabled={state.isUpdating}
                    buttonStyle={{
                        backgroundColor: "#409eff",
                        textTransform: "capitalize",
                        fontSize: 13,
                        height: 36,
                        width: 100
                    }}
                    iconStyle={{
                        width: 20,
                        height: 20,
                        color: "#fff",
                    }}
                    isLoading={state.isUpdating}
                    title={"Xác nhận"}
                    onClick={handleSubmit}
                />
            </DialogActions>
        </Dialog>
        {state.isOpenAlert && <Alert
            open={state.isOpenAlert}
            severity='success'
            message='Đổi mật khẩu thành công'
            onClose={() => setState({isOpenAlert: false})}
        />}
    </Fragment>)
}

export default ChangePasswordDialog