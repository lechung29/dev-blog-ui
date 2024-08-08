import { GridColDef } from '@mui/x-data-grid';

export const postManagementColumn: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, resizable: false },
    { field: 'title', headerName: 'Title', width: 300, resizable: false},
    { field: 'category', headerName: 'Category', width: 160, resizable: false },
    {
      field: 'author',
      headerName: 'Author',
      width: 160,
      resizable: false,
      
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      resizable: false
    },
  ];