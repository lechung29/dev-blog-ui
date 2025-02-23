import { IResponseDefault, IResponseType } from "../../types/IResponse";
import { ICreatePost, IOverViewProps, IPostDataProps, IPostStatus } from "../../types/Post";
import { IQueryGetMaxPage, IQueryObject, ObjectToQuery } from "../../utils/helper";
import instance from "../config/axios";
import {
    addFavorite,
    createPost,
    getAllPost,
    getAllTags,
    getFavorite,
    getFilterPosts,
    getMaxPages,
    getOverview,
    getSinglePost,
    guestUser,
    likePost,
    multiDeletePosts,
    root,
    updatePost,
    v1,
} from "../helpers/QueryString";

class PostService {
    public static createPost(data: ICreatePost): Promise<IResponseType<ICreatePost>> {
        return instance.post(`${root}/${v1}/post/${createPost}`, data);
    }

    public static updatePost(data: ICreatePost, postId: string, userId: string): Promise<IResponseType<ICreatePost>> {
        return instance.put(`${root}/${v1}/post/${updatePost}/${postId}/${userId}`, data )
    }

    public static getAllPosts(): Promise<IResponseType<IPostDataProps[]>> {
        return instance.get(`${root}/${v1}/post/${getAllPost}`);
    }

    public static getFilterPosts(selector: IQueryObject): Promise<IResponseType<IPostDataProps[]>> {
        const query: string = ObjectToQuery(selector);
        return instance.get(`${root}/${v1}/post/${getFilterPosts}${query}`);
    }

    public static getSinglePost(postId: string, userId?: string): Promise<IResponseType<IPostDataProps>> {
        return instance.get(`${root}/${v1}/post/${getSinglePost}/${postId}/${userId ?? guestUser}`);
    }

    public static getMaxPages(selector: IQueryGetMaxPage): Promise<IResponseType<number>> {
        const query: string = ObjectToQuery(selector);
        return instance.get(`${root}/${v1}/post/${getMaxPages}${query}`);
    }

    public static likePost(postId: string): Promise<IResponseType<IPostDataProps>> {
        return instance.put(`${root}/${v1}/post/${likePost}/${postId}`);
    }

    public static adminUpdatePostStatus(status: IPostStatus, postId: string): Promise<IResponseType<IPostDataProps[]>> {
        return instance.put(`${root}/${v1}/post/${updatePost}/${postId}/`, { status: status });
    }

    public static deleteMultiPost(postIds: string[]): Promise<IResponseType<IPostDataProps[]>> {
        return instance.post(`${root}/${v1}/post/${multiDeletePosts}`, { postIds: postIds });
    }

    public static getAllTags(): Promise<IResponseType<string[]>> {
        return instance.get(`${root}/${v1}/post/${getAllTags}`);
    }

    public static addOrRemoveFavorites(userId: string, postId: string, isAddFavorite: boolean): Promise<IResponseDefault> {
        return instance.post(`${root}/${v1}/favorite/${addFavorite}`, {
            userId: userId,
            postId: postId,
            isAddFavorite: isAddFavorite,
        });
    }

    public static getFavoritePostByUserId(userId: string): Promise<IResponseType<IPostDataProps[]>> {
        return instance.get(`${root}/${v1}/favorite/${getFavorite}/${userId}`);
    }

    public static getUserOverview(userId: string): Promise<IResponseType<IOverViewProps>> {
        return instance.get(`${root}/${v1}/post/${getOverview}/${userId}`);
    }
}

export { PostService };
