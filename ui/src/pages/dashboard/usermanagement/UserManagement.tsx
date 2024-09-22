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
import { useTranslation } from 'react-i18next';
import { TooltipHost } from '../../../components/common/tooltiphost/TooltipHost';
import { formatDate } from '../../../utils/helper';

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
    const { t } = useTranslation()
    const dataTableRef = useRef<IDataTableRef>(null);

    const finalColumns = userManagementColumn.map((item) => ({
        ...item,
        headerName: t(item.headerName as string),
        renderCell: (item) => {
            switch (item.field) {
                case "role":
                    let tempRole = ""
                    if (item.value === "admin") {
                        tempRole = t("Role.Admin")
                    } else {
                        tempRole = t("Role.User")
                    }
                    return <div className="g-post-table-field-category">
                        <TooltipHost title={tempRole}>
                            <span>{tempRole}</span>
                        </TooltipHost>
                    </div>
                case "status":
                    let tempStatus = ""
                    if (item.value === "locked") {
                        tempStatus = t("User.Status.Locked")
                    } else {
                        tempStatus = t("User.Status.Active")
                    }
                    return <div className="g-post-table-field-category">
                        <TooltipHost title={tempStatus}>
                            <span>{tempStatus}</span>
                        </TooltipHost>
                    </div>
                case "createdAt":
                case "updatedAt":
                    return <span>{formatDate(new Date(item.value))}</span>
                case "_id":
                case "author":
                default:
                    return item.value
            }

        }
    }))

    const getAllUsers = async () => {
        setState({ loading: true });
        const allUser = await AuthService.getAllUsers();
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

    const handleChangeUserStatus = async () => {
        setState({ isLockLoading: true })
        const existingCurrentUser = selectedUsers.find((item) => item === user?._id!)
        if (existingCurrentUser) {
            setState((draft) => {
                draft.isLockLoading = false
                draft.isOpenLockUserDialog = false;
                draft.isOpenAlert = true;
                draft.actionMessage = "Error.Cannot.Lock.Self";
                draft.messageType = ISeverity.error
            })
            return Promise.resolve();
        } else {
            return AuthService.updateUserStatus(selectedUsers[0], lockStatusNeedUpdate())
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
        return lockStatus === userStatus.active 
            ? t("Confirm.Lock.User.Description", { count: selectedUsers.length })
            : t("Confirm.Unlock.User.Description", { count: selectedUsers.length })
    }, [selectedUsers, lockStatus])

    return (
        <DashboardLayout title={t("ManageUser.Title")}>
            <div className="g-dashboard-content-section">
                <Stack marginBottom={"0.5rem"} flexDirection={"row"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} gap={3}>
                    {selectedUsers.length === 1 && <IconButton size="small" className="g-delete-action-button" icon={onRenderLockedItem} onClick={() => setState({ isOpenLockUserDialog: true })} />}
                    <IconButton size="small" isReloadButton rotate={loading} className="g-reload-action-button" onClick={handleReload} />
                </Stack>
                <DataTable
                    isLoading={loading}
                    onSelection={handleChangeSelection}
                    ref={dataTableRef}
                    columns={finalColumns}
                    items={users}
                    getData={() => getAllUsers()}
                    tableHeight={400}
                    tableWidth={"100%"}
                    selectionItems={selectedUsers}
                />
                {isOpenLockUserDialog && (
                    <ConfirmDialog
                        open={isOpenLockUserDialog}
                        title={t("Confirm.Lock.User.Title")}
                        content={deleteItemText}
                        isLoading={isLockLoading}
                        handleConfirm={handleChangeUserStatus}
                        onClose={() => setState({ isOpenLockUserDialog: false })}
                    />
                )}
                {isOpenAlert && <Alert
                    open={isOpenAlert}
                    severity={messageType}
                    message={t(actionMessage)}
                    onClose={() => setState({ isOpenAlert: false })}
                />}
            </div>
        </DashboardLayout>
    )
}

export default UserManagement