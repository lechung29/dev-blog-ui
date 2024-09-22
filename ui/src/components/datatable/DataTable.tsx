/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

export interface IDataTableRef {
	reload: () => void;
}

interface IDataTabelProps {
	columns: GridColDef[];
	items: any[];
	tableWidth: number | string;
	tableHeight: number | string;
	getData: () => Promise<any>;
	ref: React.ForwardedRef<IDataTableRef>;
	onSelection?: (selection: GridRowSelectionModel) => void;
	isLoading: boolean
	selectionItems: string[]
}

const DataTable = React.forwardRef((props: IDataTabelProps, ref) => {
	const { columns, items, getData, onSelection, isLoading, tableHeight, tableWidth } = props;

	React.useEffect(() => {
		getData()
	}, []);

	React.useImperativeHandle(ref, () => ({
		reload: () => {
			getData()
		},
	}));


	return (
		<div style={{ height: tableHeight, width: tableWidth }}>
			<DataGrid
				rows={items}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				// pageSizeOptions={[5, 10]}
				checkboxSelection
				onRowSelectionModelChange={onSelection}
				disableRowSelectionOnClick
				disableColumnMenu
				rowHeight={48}
				rowSelectionModel={props.selectionItems}
				columnVisibilityModel={{
					id: false
				}}
				loading={isLoading}
				slotProps={{
					loadingOverlay: {
						variant: 'skeleton',
						noRowsVariant: 'skeleton',
					},
				}}
				hideFooterSelectedRowCount
			/>
		</div>
	);
});
export default DataTable;
