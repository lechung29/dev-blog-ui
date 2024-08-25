import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIdentityProps, IPostProps } from "../../../types/Post";
import { PostService } from "../../../services/posts/PostService";
import { RootState } from "../../store/store";

export type IPostWithId = IPostProps & IIdentityProps

export interface IPostState {
    isLoading: boolean;
    multiplePosts: IPostWithId[]
    message: string
}

const initialState: IPostState = {
    isLoading: false,
    message: "",
    multiplePosts: [],
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    return await PostService.getAllPosts()
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.multiplePosts = action.payload.data?.map((item) => {
                return {
                    ...item,
                    id: item._id,
                    author: item.author.displayName
                }
            }) as IPostWithId[]
            state.message = action.payload.message
        })
    }
})

export const postState = (state: RootState) => state.post
export default postSlice.reducer;


