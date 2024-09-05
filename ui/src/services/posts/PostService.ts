import { IResponseType } from "../../types/IResponse";
import { ICreatePost, IPostDataProps, IPostStatus } from "../../types/Post";
import { IQueryObject, ObjectToQuery } from "../../utils/helper";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createPost, getAllPost, getFilterPosts, getMaxPages, getPublicPosts, getSinglePost, guestUser, multiDeletePosts, root, updatePost, v1 } from "../helpers/QueryString";

class PostService {
    public static createPost(data: ICreatePost): Promise<IResponseType<ICreatePost>> {
        return FetchApi(`${root}/${v1}/post/${createPost}`, FetchMethod.POST, data);
    }
    public static getAllPosts(): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}`, FetchMethod.GET);
    }

    public static getFilterPosts(selector: IQueryObject): Promise<IResponseType<IPostDataProps[]>> {
        const query: string = ObjectToQuery(selector)
        return FetchApi(`${root}/${v1}/post/${getFilterPosts}${query}`, FetchMethod.GET);
    }

    public static getPublicPosts(selector: IQueryObject): Promise<IResponseType<IPostDataProps[]>> {
        const query: string = ObjectToQuery(selector)
        return FetchApi(`${root}/${v1}/post/${getPublicPosts}${query}`, FetchMethod.GET);
    }

    public static getSinglePost(postId: string, userId?: string): Promise<IResponseType<IPostDataProps>> {
        return FetchApi(`${root}/${v1}/post/${getSinglePost}/${postId}/${userId ?? guestUser}`, FetchMethod.GET);
    }

    public static getMaxPages(): Promise<IResponseType<number>> {
        return FetchApi(`${root}/${v1}/post/${getMaxPages}`, FetchMethod.GET);
    }

    public static adminUpdatePostStatus(status: IPostStatus, postId: string): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${updatePost}/${postId}/`, FetchMethod.PUT, { status: status});
    }

    public static deleteMultiPost(postIds: string[]): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${multiDeletePosts}`, FetchMethod.DELETE, { postIds: postIds });
    }
}

export { PostService };
