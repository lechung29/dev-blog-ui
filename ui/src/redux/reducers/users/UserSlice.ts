import { createSlice } from "@reduxjs/toolkit";
import { IUserInformation } from "../../../types/IAuth";
import { RootState } from "../../store/store";

export interface IAuthenticationState {
    isLoggedIn: boolean;
    user: IUserInformation | null;
}

const initialState: IAuthenticationState = {
    isLoggedIn: false,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("access_token", action.payload.access_token)
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("access_token");
        },
    },
})

export const userState = (state: RootState) => state.user

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;