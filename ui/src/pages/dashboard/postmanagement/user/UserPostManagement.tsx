import React, { useMemo, useRef } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import DataTable, { IDataTabelRef } from "../../../../components/datatable/DataTable";
import { postManagementColumn } from "../../../../components/datatable/utils";
import { useImmerState } from "../../../../hook/useImmerState";
import { PostService } from "../../../../services/posts/PostService";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "../../../../components/common/button/iconbutton/IconButton";
import "./index.scss";
import ConfirmDialog from "../../../../components/common/confirmDialog/ConfirmDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

interface IPostManagementState {
	items: any[];
	itemStatus: string
	selectedItems: any[];
	isLoading: boolean;
	isOpenDeleteDialog: boolean;
	isOpenUpdateDialog: boolean;
}

const initialState: IPostManagementState = {
	items: [],
	selectedItems: [],
	isLoading: false,
	isOpenDeleteDialog: false,
	isOpenUpdateDialog: false,
	itemStatus: ""
};

const UserPostManagement = () => {
	const isAdmin = useSelector((state: RootState) => state.user.user?.role)
	const [state, setState] = useImmerState<IPostManagementState>(initialState);
	const dataTableRef = useRef<IDataTabelRef>(null);

	const handleChange = (event: SelectChangeEvent) => {
		setState({ itemStatus: event.target.value});
	};

	const getData = () => {
		setState({ isLoading: true });
		return PostService.getPosts({ limit: 10 }).then((data) => {
			const rowItems = data.data.map((item) => ({ ...item, id: item._id, author: item.author.displayName }));
			console.log(rowItems);
			setState({ items: rowItems, isLoading: false });
		});
	};

	const handleChangeSelection = (selection) => {
		setState({ selectedItems: selection });
	};

	const handleReload = () => {
		dataTableRef.current?.reload();
	};

	const deleteItemText = useMemo(() => {
		return `Bạn chắc chắn muốn xóa ${state.selectedItems.length > 1 ? state.selectedItems.length : ""} bài viết đã chọn?`
	}, [state.selectedItems])

	const renderChangeStatus = () => {
		return (
			<FormControl sx={{ m: 1, width: "100%" }} size="small">
				<InputLabel id="demo-select-small-label">Status</InputLabel>
				<Select labelId="demo-select-small-label" id="status-select-small" value={state.itemStatus} label="Status" onChange={handleChange}>
					<MenuItem value={"Publish"}>Publish</MenuItem>
					<MenuItem value={"Hide"}>Hide</MenuItem>
				</Select>
			</FormControl>
		);
	};

	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack marginBottom={"0.5rem"} flexDirection={"row"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} gap={3}>
					{isAdmin === "admin" && state.selectedItems.length === 1 && <IconButton size="small" className="g-edit-action-button" icon={<EditIcon />} onClick={() => setState({ isOpenUpdateDialog: true })} />}
					{state.selectedItems.length > 0 && <IconButton size="small" className="g-delete-action-button" icon={<DeleteIcon />} onClick={() => setState({ isOpenDeleteDialog: true })} />}
					<IconButton size="small" isReloadButton rotate={state.isLoading} className="g-reload-action-button" onClick={handleReload} />
				</Stack>
				<DataTable
					isLoading={state.isLoading}
					onSelection={handleChangeSelection}
					selectedItems={state.selectedItems}
					ref={dataTableRef}
					columns={postManagementColumn}
					items={state.items}
					getData={getData}
				/>
				{state.isOpenDeleteDialog && (
					<ConfirmDialog
						open={state.isOpenDeleteDialog}
						title="Xác nhận xóa bài viết"
						content={deleteItemText}
						handleConfirm={() => {
							// Xử lý xóa bài viết
							setState({ isOpenDeleteDialog: false });
							dataTableRef.current?.reload();
						}}
						onClose={() => setState({ isOpenDeleteDialog: false })}
					/>
				)}
				{state.isOpenUpdateDialog && (
					<ConfirmDialog
						open={state.isOpenUpdateDialog}
						title="Chỉnh sửa trạng thái"
						content={renderChangeStatus()}
						handleConfirm={() => {
							// Xử lý cập nhật trạng thái
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
