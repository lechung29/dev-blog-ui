import { IResponseType } from "../../types/IResponse";
import { ICreatePost, IPostDataProps, IPostStatus } from "../../types/Post";
import { IQueryGetMaxPage, IQueryObject, ObjectToQuery } from "../../utils/helper";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createPost, getAllPost, getAllTags, getFilterPosts, getMaxPages, getSinglePost, guestUser, likePost, multiDeletePosts, root, updatePost, v1 } from "../helpers/QueryString";

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

    public static getSinglePost(postId: string, userId?: string): Promise<IResponseType<IPostDataProps>> {
        return FetchApi(`${root}/${v1}/post/${getSinglePost}/${postId}/${userId ?? guestUser}`, FetchMethod.GET);
    }

    public static getMaxPages(selector: IQueryGetMaxPage): Promise<IResponseType<number>> {
        const query: string = ObjectToQuery(selector)
        return FetchApi(`${root}/${v1}/post/${getMaxPages}${query}`, FetchMethod.GET);
    }

    public static likePost(postId: string): Promise<IResponseType<IPostDataProps>> {
        return FetchApi(`${root}/${v1}/post/${likePost}/${postId}`, FetchMethod.PUT);
    }

    public static adminUpdatePostStatus(status: IPostStatus, postId: string): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${updatePost}/${postId}/`, FetchMethod.PUT, { status: status});
    }

    public static deleteMultiPost(postIds: string[]): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${multiDeletePosts}`, FetchMethod.DELETE, { postIds: postIds });
    }

    public static getAllTags(): Promise<IResponseType<string[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllTags}`, FetchMethod.GET);
    } 
}

export { PostService };
