import React, { useRef } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import DataTable, { IDataTabelRef } from "../../../../components/datatable/DataTable";
import { postManagementColumn } from "../../../../components/datatable/utils";
import { useImmerState } from "../../../../hook/useImmerState";
import { PostService } from "../../../../services/posts/PostService";

interface IPostManagementState {
	items: any[];
}

const initialState: IPostManagementState = {
	items: [],
};

const UserPostManagement = () => {
	const [state, setState] = useImmerState<IPostManagementState>(initialState);
	const dataTableRef = useRef<IDataTabelRef>(null);
	const getData = () => {
		return PostService.getPosts({ limit: 10 }).then((data) => {
			const rowItems = data.data.map((item) => ({ ...item, id: item._id, author: item.author.displayName }));
			setState({ items: rowItems });
		});
	};

	const handleChangeSelection = (selection) => {
		console.log("Selection changed:", selection);
		// Perform your action here
	};

  const handleReload = () => {
    dataTableRef.current?.reload()
  }

	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
        <button onClick={handleReload}>Reload</button>
        <DataTable onSelection={handleChangeSelection} ref={dataTableRef} columns={postManagementColumn} items={state.items} getData={getData} />
			</div>
		</DashboardLayout>
	);
};

export default UserPostManagement;
