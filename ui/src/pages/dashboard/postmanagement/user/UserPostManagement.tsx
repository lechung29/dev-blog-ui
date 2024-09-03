import React, { useMemo, useRef } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import DataTable, { IDataTabelRef } from "../../../../components/datatable/DataTable";
import { postManagementColumn } from "../../../../components/datatable/utils";
import { useImmerState } from "../../../../hook/useImmerState";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "../../../../components/common/button/iconbutton/IconButton";
import "./index.scss";
import ConfirmDialog from "../../../../components/common/confirmDialog/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { deletePost, getAllPosts, postState, stopLoading } from "../../../../redux/reducers/posts/PostSlice";
import { userState } from "../../../../redux/reducers/users/UserSlice";
import { IAction, IFunc } from "../../../../types/Function";

interface IPostManagementProps {

}

interface IPostManagementState {
	itemStatus: string
	selectedItems: string[];
	isOpenDeleteDialog: boolean;
	isOpenUpdateDialog: boolean;
}

const initialState: IPostManagementState = {
	selectedItems: [],
	isOpenDeleteDialog: false,
	isOpenUpdateDialog: false,
	itemStatus: ""
};

const UserPostManagement: React.FunctionComponent<IPostManagementProps> = (props) => {
	const [state, setState] = useImmerState<IPostManagementState>(initialState);
	const { isOpenDeleteDialog, isOpenUpdateDialog, itemStatus, selectedItems } = state
	const { user } = useAppSelector(userState)
	const { allPosts, isLoading, isDeleteLoading } = useAppSelector(postState)
	const dispatch = useAppDispatch()
	const dataTableRef = useRef<IDataTabelRef>(null);

	const handleChange = (event: SelectChangeEvent) => {
		setState({ itemStatus: event.target.value });
	};

	const getData = () => {
		return dispatch(getAllPosts())
	};

	const handleChangeSelection = (selection) => {
		setState({ selectedItems: selection });
	};

	const handleReload: IAction = () => {
		dataTableRef.current?.reload();
	};

	const deleteItemText = useMemo(() => {
		return `Bạn chắc chắn muốn xóa ${selectedItems.length > 1 ? selectedItems.length : ""} bài viết đã chọn?`
	}, [selectedItems])

	const allPostsItem = useMemo(() => {
		return user?.role === "admin" ? allPosts : allPosts.filter((item) => item.author === user?.displayName)
	}, [allPosts, user?.role, user?.displayName])

	const renderChangeStatus: IFunc<JSX.Element> = () => {
		return (
			<FormControl sx={{ m: 1, width: "100%" }} size="small">
				<InputLabel id="demo-select-small-label">Status</InputLabel>
				<Select labelId="demo-select-small-label" id="status-select-small" value={itemStatus} label="Status" onChange={handleChange}>
					<MenuItem value={"Publish"}>Publish</MenuItem>
					<MenuItem value={"Hide"}>Hide</MenuItem>
				</Select>
			</FormControl>
		);
	};

	return (
		<DashboardLayout title="Devblog - Quản lý post">
			<div className="g-dashboard-content-section">
				<Stack className="g-management-post-section-action-button">
					{user?.role === "admin"
						&& selectedItems.length === 1
						&& <IconButton
							size="small"
							className="g-edit-action-button"
							icon={<EditIcon />}
							onClick={() => setState({ isOpenUpdateDialog: true })}
						/>}
					{selectedItems.length > 0 && <IconButton
						size="small"
						className="g-delete-action-button"
						icon={<DeleteIcon />}
						onClick={() => setState({ isOpenDeleteDialog: true })}
					/>}
					<IconButton
						size="small"
						isReloadButton
						rotate={isLoading}
						className="g-reload-action-button"
						onClick={handleReload}
					/>
				</Stack>
				<DataTable
					isLoading={isLoading}
					onSelection={handleChangeSelection}
					ref={dataTableRef}
					columns={postManagementColumn}
					items={allPostsItem}
					getData={() => getData()}
					tableWidth={"100%"}
					tableHeight={380}
				/>
				{state.isOpenDeleteDialog && (
					<ConfirmDialog
						open={isOpenDeleteDialog}
						title="Xác nhận xóa bài viết"
						content={deleteItemText}
						isLoading={isDeleteLoading}
						handleConfirm={() => {
							dispatch(deletePost(selectedItems)).then(() => {
								setState({ isOpenDeleteDialog: false });
								setTimeout(() => {
									dispatch(stopLoading())
								}, 2000)
							})
						}}
						onClose={() => setState({ isOpenDeleteDialog: false })}
					/>
				)}
				{state.isOpenUpdateDialog && (
					<ConfirmDialog
						open={isOpenUpdateDialog}
						title="Chỉnh sửa trạng thái"
						content={renderChangeStatus()}
						isLoading={isDeleteLoading}
						handleConfirm={() => {
							setState({ isOpenUpdateDialog: false });
							dataTableRef.current?.reload();
						}}
						onClose={() => setState({ isOpenUpdateDialog: false })}
					/>
				)}
			</div>
		</DashboardLayout>
	);
};

export default UserPostManagement;
