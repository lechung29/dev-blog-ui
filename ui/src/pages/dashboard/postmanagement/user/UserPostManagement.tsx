import React, { useRef } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import DataTable, { IDataTabelRef } from "../../../../components/datatable/DataTable";
import { postManagementColumn } from "../../../../components/datatable/utils";
import { useImmerState } from "../../../../hook/useImmerState";
import { PostService } from "../../../../services/posts/PostService";
import { Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "../../../../components/common/button/iconbutton/IconButton";
import "./index.scss"


interface IPostManagementState {
	items: any[];
	selectedItems: any[];
	isLoading: boolean;
}

const initialState: IPostManagementState = {
	items: [],
	selectedItems: [],
	isLoading: false,
};

const UserPostManagement = () => {
	const [state, setState] = useImmerState<IPostManagementState>(initialState);
	const dataTableRef = useRef<IDataTabelRef>(null);

	const getData = () => {
		setState({isLoading: true})
		return PostService.getPosts({ limit: 10 }).then((data) => {
			const rowItems = data.data.map((item) => ({ ...item, id: item._id, author: item.author.displayName }));
			console.log(rowItems)
			setState({ items: rowItems, isLoading: false });
		});
	};

	const handleChangeSelection = (selection) => {
		console.log(selection);
		setState({ selectedItems: selection });
	};

	const handleReload = () => {
		dataTableRef.current?.reload();
	};


	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack 
					marginBottom={"0.5rem"} 
					flexDirection={"row"} 
					display={"flex"} 
					alignItems={"center"} 
					justifyContent={"flex-end"} 
					gap={3}
				>
					<IconButton 
						size="small"
						className="g-edit-action-button"
						icon={<EditIcon/>}
					/>
					<IconButton 
						size="small"
						className="g-delete-action-button"
						icon={<DeleteIcon/>}
					/>
					<IconButton 
						size="small"
						isReloadButton
						rotate={state.isLoading}
						className="g-reload-action-button"
						onClick={handleReload}
					/>
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
			</div>
		</DashboardLayout>
	);
};

export default UserPostManagement;
