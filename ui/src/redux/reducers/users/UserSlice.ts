import { createSlice } from "@reduxjs/toolkit";
import { IUpdateUserProps, IUserInformation } from "../../../types/IAuth";
import { RootState } from "../../store/store";

export interface IAuthenticationState {
    user: IUserInformation | null;
}

const initialState: IAuthenticationState = {
    user: null,
};

export interface IUpdateUserPropsWithId extends IUpdateUserProps {
    userId: string;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("accessToken", action.payload.accessToken)
        },
        logout: (state) => {
            state.user = null;
            window.localStorage.removeItem("accessToken");
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const userState = (state: RootState) => state.user

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;