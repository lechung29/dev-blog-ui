import { GridColDef } from "@mui/x-data-grid";

export const postManagementColumn: GridColDef[] = [
    { field: "id", headerName: "id", width: 100, hideable: true },
    { field: "_id", headerName: "ID", width: 100, resizable: true },
    { field: "title", headerName: "Post.Title", width: 300, resizable: true },
    { field: "category", headerName: "Common.Category", width: 160, resizable: true },
    {
        field: "author",
        headerName: "Common.Author",
        width: 160,
        resizable: true,
    },
    {
        field: "status",
        headerName: "Common.Status",
        width: 160,
        resizable: true,
    },
    {
        field: "tags",
        headerName: "Post.Create.TagList",
        width: 100,
        resizable: true,
    },
    {
        field: "createdAt",
        headerName: "Common.CreatedAt",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
    {
        field: "updatedAt",
        headerName: "Common.UpdatedAt",
        width: 160,
        resizable: true,
        valueFormatter: (params) => new Date(params).toLocaleString(),
    },
];

export const userManagementColumn: GridColDef[] = [
    { field: "id", headerName: "id", width: 100, hideable: true },
    { field: "_id", headerName: "ID", width: 100, resizable: true },
    { field: "displayName", headerName: "Common.DisplayName", width: 240, resizable: true },
    { field: "email", headerName: "Common.Email", width: 160, resizable: true },
    { field: "status", headerName: "Common.Status", width: 160, resizable: true },
    {
        field: "role",
        headerName: "Common.Role",
        width: 160,
        resizable: true,
    },
    {
        field: "createdAt",
        headerName: "Common.CreatedAt",
        width: 160,
        resizable: true,
    },
    {
        field: "updatedAt",
        headerName: "Common.UpdatedAt",
        width: 160,
        resizable: true,
    },
];
