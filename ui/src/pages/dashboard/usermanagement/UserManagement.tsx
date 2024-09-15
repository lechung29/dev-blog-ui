/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { Stack } from '@mui/material'
import { IconButton } from '../../../components/common/button/iconbutton/IconButton'
import { useImmerState } from '../../../hook/useImmerState';
import DataTable, { IDataTableRef } from '../../../components/datatable/DataTable';
// import { PostService } from '../../../services/posts/PostService';
import { userManagementColumn } from '../../../components/datatable/utils';
import ConfirmDialog from '../../../components/common/confirmDialog/ConfirmDialog';
import { IUserInformationWithId, userStatus } from '../../../types/IAuth';
import { AuthService } from '../../../services/auth/AuthService';
import { useAppSelector } from '../../../redux/store/store';
import { userState } from '../../../redux/reducers/users/UserSlice';
import { Alert, ISeverity } from '../../../components/common/alert/Alert';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../../../context/AuthContext';

interface IUserManagementProps { }

interface IUserManagementState {
    users: IUserInformationWithId[];
    loading: boolean
    selectedUsers: string[];
    isOpenLockUserDialog: boolean;
    isLockLoading: boolean;
    isOpenAlert: boolean
    actionMessage: string
    messageType: ISeverity
    lockStatus: userStatus
}

const initialState: IUserManagementState = {
    users: [],
    loading: false,
    selectedUsers: [],
    isOpenLockUserDialog: false,
    isLockLoading: false,
    isOpenAlert: false,
    actionMessage: "",
    messageType: ISeverity.success,
    lockStatus: userStatus.active
}

const UserManagement: React.FunctionComponent<IUserManagementProps> = (props) => {
    const [state, setState] = useImmerState<IUserManagementState>(initialState)
    const { isOpenLockUserDialog, loading, selectedUsers, users, isLockLoading, isOpenAlert, actionMessage, messageType, lockStatus } = state
    const { user } = useAppSelector(userState)
    const dataTableRef = useRef<IDataTableRef>(null);
    const { handleUnauthorized } = useAuth()
    const getAllUsers = async () => {
        setState({ loading: true });
        const allUser = await AuthService.getAllUsers(handleUnauthorized);
        const formattedUsers = allUser.data?.map((user) => ({
            ...user,
            id: user._id,
        }))
        setState({ users: formattedUsers, loading: false });
    };

    useEffect(() => {
        const selectedUserStatus = users.find((user) => user._id === selectedUsers[0])?.status || userStatus.active
        setState({ lockStatus: selectedUserStatus })
    }, [selectedUsers])

    const onRenderLockedItem = useMemo(() => {
        return lockStatus === userStatus.active ? <LockIcon /> : <LockOpenIcon />
    }, [lockStatus])

    const lockStatusNeedUpdate = () => {
        return lockStatus === userStatus.active ? userStatus.inactive : userStatus.active
    }

    const handleDeleteUser = async () => {
        setState({ isLockLoading: true })
        const existingCurrentUser = selectedUsers.find((item) => item === user?._id!)
        if (existingCurrentUser) {
            setState((draft) => {
                draft.isLockLoading = false
                draft.isOpenLockUserDialog = false;
                draft.isOpenAlert = true;
                draft.actionMessage = "Bạn không thể khóa tài khoản của chính mình";
                draft.messageType = ISeverity.error
            })
            return Promise.resolve();
        } else {
            return AuthService.updateUserStatus(selectedUsers[0], lockStatusNeedUpdate(), handleUnauthorized)
                .then((data) => {
                    setState((draft) => {
                        draft.isLockLoading = false;
                        draft.isOpenLockUserDialog = false;
                        draft.isOpenAlert = true;
                        draft.messageType = data.requestStatus ? ISeverity.success : ISeverity.error
                        draft.actionMessage = data.message;
                        draft.selectedUsers = []
                    })
                }).then(() => {
                    dataTableRef.current?.reload()
                })
        }
    }

    const handleChangeSelection = (selection) => {
        setState({ selectedUsers: selection });
    };

    const handleReload = () => {
        dataTableRef.current?.reload();
    };

    const deleteItemText = useMemo(() => {
        return `Bạn chắc chắn muốn xóa ${selectedUsers.length} người dùng đã chọn?`
    }, [selectedUsers])

    return (
        <DashboardLayout title='Quản lý người dùng'>
            <div className="g-dashboard-content-section">
                <Stack marginBottom={"0.5rem"} flexDirection={"row"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} gap={3}>
                    {selectedUsers.length === 1 && <IconButton size="small" className="g-delete-action-button" icon={onRenderLockedItem} onClick={() => setState({ isOpenLockUserDialog: true })} />}
                    <IconButton size="small" isReloadButton rotate={loading} className="g-reload-action-button" onClick={handleReload} />
                </Stack>
                <DataTable
                    isLoading={loading}
                    onSelection={handleChangeSelection}
                    ref={dataTableRef}
                    columns={userManagementColumn}
                    items={users}
                    getData={() => getAllUsers()}
                    tableHeight={400}
                    tableWidth={"100%"}
                    selectionItems={selectedUsers}
                />
                {isOpenLockUserDialog && (
                    <ConfirmDialog
                        open={isOpenLockUserDialog}
                        title="Xác nhận xóa người dùng"
                        content={deleteItemText}
                        isLoading={isLockLoading}
                        handleConfirm={handleDeleteUser}
                        onClose={() => setState({ isOpenLockUserDialog: false })}
                    />
                )}
                {isOpenAlert && <Alert
                    open={isOpenAlert}
                    severity={messageType}
                    message={actionMessage}
                    onClose={() => setState({ isOpenAlert: false })}
                />}
            </div>
        </DashboardLayout>
    )
}

export default UserManagement