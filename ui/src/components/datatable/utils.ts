import { GridColDef } from "@mui/x-data-grid";

export const postManagementColumn: GridColDef[] = [
    { field: "id", headerName: "id", width: 100, hideable: true },
    { field: "_id", headerName: "ID", width: 100, resizable: true },
    { field: "title", headerName: "Title", width: 300, resizable: true },
    { field: "category", headerName: "Category", width: 160, resizable: true },
    {
        field: "author",
        headerName: "Author",
        width: 160,
        resizable: true,
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        resizable: true,
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 100,
        resizable: true,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
    {
        field: "updatedAt",
        headerName: "Updated At",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
];

export const userManagementColumn: GridColDef[] = [
    { field: "id", headerName: "id", width: 100, hideable: true },
    { field: "_id", headerName: "ID", width: 100, resizable: true },
    { field: "displayName", headerName: "Display Name", width: 240, resizable: true },
    { field: "email", headerName: "Email", width: 160, resizable: true },
    { field: "status", headerName: "Status", width: 160, resizable: true },
    {
        field: "role",
        headerName: "Role",
        width: 160,
        resizable: true,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
    {
        field: "updatedAt",
        headerName: "Updated At",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
];
