/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import DataTable, { IDataTableRef } from "../../../../components/datatable/DataTable";
import { postManagementColumn } from "../../../../components/datatable/utils";
import { useImmerState } from "../../../../hook/useImmerState";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "../../../../components/common/button/iconbutton/IconButton";
import "./index.scss";
import ConfirmDialog from "../../../../components/common/confirmDialog/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { closeAlert, deletePost, getAllPosts, postState, stopLoading, updatePost } from "../../../../redux/reducers/posts/PostSlice";
import { userState } from "../../../../redux/reducers/users/UserSlice";
import { IAction, IFunc } from "../../../../types/Function";
import { IPostStatus } from "../../../../types/Post";
import { useTranslation } from "react-i18next";
import { Alert } from "../../../../components/common/alert/Alert";
import { TooltipHost } from "../../../../components/common/tooltiphost/TooltipHost";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/helper";

interface IPostManagementProps {

}

interface IPostManagementState {
	itemStatus: IPostStatus
	selectedItems: string[];
	isOpenDeleteDialog: boolean;
	isOpenUpdateDialog: boolean;
}

const initialState: IPostManagementState = {
	selectedItems: [],
	isOpenDeleteDialog: false,
	isOpenUpdateDialog: false,
	itemStatus: IPostStatus.Pending
};

const UserPostManagement: React.FunctionComponent<IPostManagementProps> = (props) => {
	const [state, setState] = useImmerState<IPostManagementState>(initialState);
	const { isOpenDeleteDialog, isOpenUpdateDialog, itemStatus, selectedItems } = state
	const { user } = useAppSelector(userState)
	const { allPosts, isLoading, isUpdateAndDeleteLoading, alertType, isAlertOpen, message } = useAppSelector(postState)
	const dispatch = useAppDispatch()
	const dataTableRef = useRef<IDataTableRef>(null);
	const { t } = useTranslation()
	const navigate = useNavigate()

	const finalColumns = postManagementColumn.map((post) => ({
		...post,
		headerName: t(post.headerName as string),
		renderCell: (item) => {
			switch (item.field) {
				case "title":
					return <div className="g-post-table-field-title" onClick={() => navigate(`/post/${item.row._id}`)}>
						<TooltipHost title={item.value}>
							<span>{item.value}</span>
						</TooltipHost>
					</div>
				case "category":
					let temp = ""
					if (item.value === "post") {
						temp = t("Category.Post")
					} else if (item.value === "question") {
						temp = t("Category.Question")
					} else {
						temp = t("Category.Discussion")
					}
					return <div className="g-post-table-field-category">
						<TooltipHost title={temp}>
							<span>{temp}</span>
						</TooltipHost>
					</div>
				case "status":
					let tempStatus = ""
					if (item.value === "Pending") {
						tempStatus = t("Status.Pending")
					} else if (item.value === "Public") {
						tempStatus = t("Status.Public")
					} else {
						tempStatus = t("Status.Hidden")
					}
					return <div className="g-post-table-field-category">
						<TooltipHost title={tempStatus}>
							<span>{tempStatus}</span>
						</TooltipHost>
					</div>
				case "tags":
					let tempTag = item.value.join(" - ")
					return <span>{tempTag}</span>
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

	const handleChange = (event: SelectChangeEvent) => {
		setState({ itemStatus: event.target.value as IPostStatus })
	};

	const getData = () => {
		return dispatch(getAllPosts())
	};

	const handleChangeSelection = (selection) => {
		setState({ selectedItems: selection });
	};

	useEffect(() => {
		if (selectedItems.length === 1) {
			const selectedPosts = allPosts.find((post) => post.id === selectedItems[0])
			if (selectedPosts) {
				setState({ itemStatus: selectedPosts.status })
			}
		} else {
			setState({ itemStatus: IPostStatus.Pending })
		}
	}, [selectedItems])

	const handleReload: IAction = () => {
		dataTableRef.current?.reload();
	};

	const deleteItemText = useMemo(() => {
		return t("Confirm.Delete.Post.Description", { count: selectedItems.length })
	}, [selectedItems, t])

	const disableStatus = (status: IPostStatus) => {
		return status === allPosts.find((post) => post.id === selectedItems[0])?.status
	}
	const allPostsItem = useMemo(() => {
		return user?.role === "admin" ? allPosts : allPosts.filter((item) => item.author === user?.displayName)
	}, [allPosts, user?.role, user?.displayName])

	const renderChangeStatus: IFunc<JSX.Element> = () => {
		return (
			<FormControl sx={{ m: 1, width: "100%" }} size="small">
				<InputLabel id="demo-select-small-label">{t("Common.Status")}</InputLabel>
				<Select labelId="demo-select-small-label" id="status-select-small" value={itemStatus} label="Status" onChange={handleChange}>
					<MenuItem disabled={disableStatus(IPostStatus.Public)} value={IPostStatus.Public}>{t("Status.Public")}</MenuItem>
					<MenuItem disabled={disableStatus(IPostStatus.Hide)} value={IPostStatus.Hide}>{t("Status.Hidden")}</MenuItem>
				</Select>
			</FormControl>
		);
	};

	const isDisable = useMemo(() => {
		return allPosts.find((post) => post.id === selectedItems[0])?.status === itemStatus
	}, [allPosts, selectedItems, itemStatus])

	return (
		<DashboardLayout title={t("ManagePost.Title")}>
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
					columns={finalColumns}
					items={allPostsItem}
					getData={() => getData()}
					tableWidth={"100%"}
					tableHeight={380}
					selectionItems={selectedItems}
				/>
				{state.isOpenDeleteDialog && (
					<ConfirmDialog
						open={isOpenDeleteDialog}
						title={t("Confirm.Delete.Post.Title")}
						content={deleteItemText}
						isLoading={isUpdateAndDeleteLoading}
						handleConfirm={() => {
							dispatch(deletePost({
								postIds: selectedItems,
							})).then(() => {
								setState({ isOpenDeleteDialog: false, selectedItems: [] });
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
						title={t("Edit.Status")}
						isDisable={isDisable}
						content={renderChangeStatus()}
						isLoading={isUpdateAndDeleteLoading}
						handleConfirm={() => {
							dispatch(updatePost({
								postId: selectedItems[0],
								status: itemStatus,
							})).then(() => {
								setState({ isOpenUpdateDialog: false, selectedItems: [] });
								setTimeout(() => {
									dispatch(stopLoading())
								}, 2000)
							})
						}}
						onClose={() => setState({
							isOpenUpdateDialog: false,
							itemStatus: allPosts.find((post) => post.id === selectedItems[0])?.status
						})}
					/>
				)}
				{isAlertOpen && <Alert
					open={isAlertOpen}
					severity={alertType}
					message={t(message)}
					onClose={() => dispatch(closeAlert())}
				/>}
			</div>
		</DashboardLayout>
	);
};

export default UserPostManagement;
