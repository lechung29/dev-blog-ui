import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIdentityProps, IPostProps, IPostStatus } from "../../../types/Post";
import { PostService } from "../../../services/posts/PostService";
import { RootState } from "../../store/store";
import { IToastProps, renderToast } from "../../../utils/utils";
import { IRequestStatus } from "../../../types/IResponse";

export type IPostWithId = IPostProps & IIdentityProps;

export interface IPostState {
    isLoading: boolean;
    isUpdateAndDeleteLoading: boolean;
    allPosts: IPostWithId[];
}

const initialState: IPostState = {
    isLoading: false,
    isUpdateAndDeleteLoading: false,
    allPosts: [],
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    return await PostService.getAllPosts();
});

interface IDeletePostProps {
    postIds: string[];
}

export const deletePost = createAsyncThunk("posts/deletePost", async (data: IDeletePostProps) => {
    return await PostService.deleteMultiPost(data.postIds);
});

export interface IUpdatePostStatus {
    status: IPostStatus;
    postId: string;
}

export const updatePost = createAsyncThunk("posts/updatePostStatus", async (data: IUpdatePostStatus) => {
    return await PostService.adminUpdatePostStatus(data.status, data.postId);
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        stopLoading: (state) => {
            state.isLoading = false;
        },
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
                state.isUpdateAndDeleteLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isUpdateAndDeleteLoading = false;
                state.isLoading = true;
                state.allPosts = action.payload.data?.map((item) => {
                    return {
                        ...item,
                        id: item._id,
                        author: item.author.displayName,
                    };
                }) as IPostWithId[];
                renderToast(
                    action.payload.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
                    action.payload.message
                );
            })
            .addCase(updatePost.pending, (state) => {
                state.isUpdateAndDeleteLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isUpdateAndDeleteLoading = false;
                state.isLoading = true;
                state.allPosts = action.payload.data?.map((item) => {
                    return {
                        ...item,
                        id: item._id,
                        author: item.author.displayName,
                    };
                }) as IPostWithId[];
                renderToast(
                    action.payload.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
                    action.payload.message
                );
            });
    },
});

export const postState = (state: RootState) => state.post;
export const { stopLoading } = postSlice.actions;
export default postSlice.reducer;
