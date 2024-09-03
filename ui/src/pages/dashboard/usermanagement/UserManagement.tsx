import React, { useMemo, useRef } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { Stack } from '@mui/material'
import { IconButton } from '../../../components/common/button/iconbutton/IconButton'
import DeleteIcon from "@mui/icons-material/Delete";
import { useImmerState } from '../../../hook/useImmerState';
import DataTable, { IDataTabelRef } from '../../../components/datatable/DataTable';
import { PostService } from '../../../services/posts/PostService';
import { postManagementColumn } from '../../../components/datatable/utils';
import ConfirmDialog from '../../../components/common/confirmDialog/ConfirmDialog';

interface IUserManagementProps { }

interface IUserManagementState {
    users: any[];
    loading: boolean
    selectedUsers: any[];
    isOpenDeleteDialog: boolean;
}

const initialState: IUserManagementState = {
    users: [],
    loading: false,
    selectedUsers: [],
    isOpenDeleteDialog: false,
}

const UserManagement: React.FunctionComponent<IUserManagementProps> = (props) => {
    const [state, setState] = useImmerState<IUserManagementState>(initialState)

    const dataTableRef = useRef<IDataTabelRef>(null);

    const getData = () => {
        setState({ loading: true });
        return PostService.getFilterPosts({ limit: 10 }).then((data) => {
            const rowItems = data.data?.map((item) => ({ ...item, author: item.author.displayName }));
            console.log(rowItems);
            setState({ users: rowItems, loading: false });
        });
    };

    const handleChangeSelection = (selection) => {
        setState({ selectedUsers: selection });
    };

    const handleReload = () => {
        dataTableRef.current?.reload();
    };

    const deleteItemText = useMemo(() => {
        return `Bạn chắc chắn muốn xóa ${state.selectedUsers.length > 1 ? state.selectedUsers.length : ""} bài viết đã chọn?`
    }, [state.selectedUsers])

    return (
        <DashboardLayout title='Quản lý người dùng'>
            <div className="g-dashboard-content-section">
                <Stack marginBottom={"0.5rem"} flexDirection={"row"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} gap={3}>
                    {state.selectedUsers.length > 0 && <IconButton size="small" className="g-delete-action-button" icon={<DeleteIcon />} onClick={() => setState({ isOpenDeleteDialog: true })} />}
                    <IconButton size="small" isReloadButton rotate={state.loading} className="g-reload-action-button" onClick={handleReload} />
                </Stack>
                <DataTable
                    isLoading={state.loading}
                    onSelection={handleChangeSelection}
                    ref={dataTableRef}
                    columns={postManagementColumn}
                    items={state.users}
                    getData={getData}
                    tableHeight={400}
                    tableWidth={"100%"}
                    selectionItems={[]}
                />
                {state.isOpenDeleteDialog && (
                    <ConfirmDialog
                        open={state.isOpenDeleteDialog}
                        title="Xác nhận xóa bài viết"
                        content={deleteItemText}
                        isLoading
                        handleConfirm={() => {
                            // Xử lý xóa bài viết
                            setState({ isOpenDeleteDialog: false });
                            dataTableRef.current?.reload();
                        }}
                        onClose={() => setState({ isOpenDeleteDialog: false })}
                    />
                )}
            </div>
        </DashboardLayout>
    )
}

export default UserManagement