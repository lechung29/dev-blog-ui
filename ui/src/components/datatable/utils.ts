import { GridColDef } from '@mui/x-data-grid';

export const postManagementColumn: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 100, hideable: true },
    { field: '_id', headerName: 'ID', width: 100, resizable: true },
    { field: 'title', headerName: 'Title', width: 300, resizable: true},
    { field: 'category', headerName: 'Category', width: 160, resizable: true },
    {
      field: 'author',
      headerName: 'Author',
      width: 160,
      resizable: true,

    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      resizable: true,
    },
  ];