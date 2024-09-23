import { IResponseDefault, IResponseType } from "../../types/IResponse";
import { ICreatePost, IOverViewProps, IPostDataProps, IPostStatus } from "../../types/Post";
import { IQueryGetMaxPage, IQueryObject, ObjectToQuery } from "../../utils/helper";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
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
        return FetchApi(`${root}/${v1}/post/${createPost}`, FetchMethod.POST, data);
    }

    public static updatePost(data: ICreatePost, postId: string, userId: string): Promise<IResponseType<ICreatePost>> {
        return FetchApi(`${root}/${v1}/post/${updatePost}/${postId}/${userId}`, FetchMethod.PUT, data )
    }

    public static getAllPosts(): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}`, FetchMethod.GET);
    }

    public static getFilterPosts(selector: IQueryObject): Promise<IResponseType<IPostDataProps[]>> {
        const query: string = ObjectToQuery(selector);
        return FetchApi(`${root}/${v1}/post/${getFilterPosts}${query}`, FetchMethod.GET);
    }

    public static getSinglePost(postId: string, userId?: string): Promise<IResponseType<IPostDataProps>> {
        return FetchApi(`${root}/${v1}/post/${getSinglePost}/${postId}/${userId ?? guestUser}`, FetchMethod.GET);
    }

    public static getMaxPages(selector: IQueryGetMaxPage): Promise<IResponseType<number>> {
        const query: string = ObjectToQuery(selector);
        return FetchApi(`${root}/${v1}/post/${getMaxPages}${query}`, FetchMethod.GET);
    }

    public static likePost(postId: string): Promise<IResponseType<IPostDataProps>> {
        return FetchApi(`${root}/${v1}/post/${likePost}/${postId}`, FetchMethod.PUT);
    }

    public static adminUpdatePostStatus(status: IPostStatus, postId: string): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${updatePost}/${postId}/`, FetchMethod.PUT, { status: status });
    }

    public static deleteMultiPost(postIds: string[]): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${multiDeletePosts}`, FetchMethod.DELETE, { postIds: postIds });
    }

    public static getAllTags(): Promise<IResponseType<string[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllTags}`, FetchMethod.GET);
    }

    public static addOrRemoveFavorites(userId: string, postId: string, isAddFavorite: boolean): Promise<IResponseDefault> {
        return FetchApi(`${root}/${v1}/favorite/${addFavorite}`, FetchMethod.POST, {
            userId: userId,
            postId: postId,
            isAddFavorite: isAddFavorite,
        });
    }

    public static getFavoritePostByUserId(userId: string): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/favorite/${getFavorite}/${userId}`, FetchMethod.GET);
    }

    public static getUserOverview(userId: string): Promise<IResponseType<IOverViewProps>> {
        return FetchApi(`${root}/${v1}/post/${getOverview}/${userId}`, FetchMethod.GET);
    }
}

export { PostService };
