/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
export interface IDataTabelRef {
	reload: () => void;
}

interface IDataTabelProps {
	columns: GridColDef[];
	items: any[];
	getData: () => Promise<any>;
	ref: React.ForwardedRef<IDataTabelRef>;
	onSelection?: (selection: GridRowSelectionModel) => void;
}

const DataTable = React.forwardRef((props: IDataTabelProps, ref) => {
	const { columns, items, getData, onSelection } = props;
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setLoading(true);
		getData().then((_data) => setLoading(false));
	}, []);

	React.useImperativeHandle(ref, () => ({
		reload: () => {
			setLoading(true);
			getData().then((_data) => setLoading(false));
		},
	}));

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={items}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				onRowSelectionModelChange={onSelection}
			/>
		</div>
	);
});
export default DataTable;
