import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface IAuthState {
    isOpenDialog: boolean;
    errorMessage: string;
}

const initialState: IAuthState = {
    isOpenDialog: false,
    errorMessage: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        handleUnauthorized: (state, action) => {
            state.isOpenDialog = true;
            state.errorMessage = action.payload;
        },
        handleNavigate: (state) => {
            state.isOpenDialog = false;
            state.errorMessage = "";
        },
    },
});

export const authState = (state: RootState) => state.auth;
export const { handleNavigate, handleUnauthorized } = authSlice.actions;
export default authSlice.reducer;
