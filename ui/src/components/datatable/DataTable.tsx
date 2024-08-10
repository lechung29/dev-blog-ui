/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

export interface IDataTabelRef {
	reload: () => void;
}

interface IDataTabelProps {
	columns: GridColDef[];
	items: any[];
	getData: () => Promise<any>;
	ref: React.ForwardedRef<IDataTabelRef>;
	onSelection?: (selection: GridRowSelectionModel) => void;
    selectedItems: any[]
	isLoading: boolean
}

const DataTable = React.forwardRef((props: IDataTabelProps, ref) => {
	const { columns, items, getData, onSelection, isLoading } = props;

	React.useEffect(() => {
		getData()
	}, []);

	React.useImperativeHandle(ref, () => ({
		reload: () => {
			getData()
		},
	}));


	return (
		<div style={{ height: 350, width: "100%" }}>
			<DataGrid
				rows={items}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
                pageSizeOptions={[5,10]}
				checkboxSelection
				onRowSelectionModelChange={onSelection}
                disableColumnMenu
                rowHeight={48}
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
			/>
		</div>
	);
});
export default DataTable;
