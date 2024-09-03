import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIdentityProps, IPostProps } from "../../../types/Post";
import { PostService } from "../../../services/posts/PostService";
import { RootState } from "../../store/store";
import { IToastProps, renderToast } from "../../../utils/utils";
import { IRequestStatus } from "../../../types/IResponse";

export type IPostWithId = IPostProps & IIdentityProps;

export interface IPostState {
    isLoading: boolean;
    isDeleteLoading: boolean;
    allPosts: IPostWithId[];
}

const initialState: IPostState = {
    isLoading: false,
    isDeleteLoading: false,
    allPosts: [],
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    return await PostService.getAllPosts();
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postIds: string[]) => {
    return await PostService.deleteMultiPost(postIds);
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        stopLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allPosts = action.payload.data?.map((item) => {
                    return {
                        ...item,
                        id: item._id,
                        author: item.author.displayName,
                    };
                }) as IPostWithId[];
            })
            .addCase(deletePost.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isDeleteLoading = false;
                state.isLoading = true;
                state.allPosts = action.payload.data?.map((item) => {
                    return {
                        ...item,
                        id: item._id,
                        author: item.author.displayName,
                    };
                }) as IPostWithId[];
                renderToast(
                    action.payload.requestStatus === IRequestStatus.Success 
                        ? IToastProps.success 
                        : IToastProps.error
                    , action.payload.message
                );
            });
    },
});

export const postState = (state: RootState) => state.post;
export const { stopLoading } = postSlice.actions
export default postSlice.reducer;
