import { IResponseType } from "../../types/IResponse";
import { ICreatePost, IPostDataProps } from "../../types/Post";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createPost, getAllPost, multiDeletePosts, root, v1 } from "../helpers/QueryString";

class PostService {
    public static createPost(data: ICreatePost): Promise<IResponseType<ICreatePost>> {
        return FetchApi(`${root}/${v1}/post/${createPost}`, FetchMethod.POST, data);
    }
    public static getAllPosts(): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}`, FetchMethod.GET);
    }

    public static getFilterPosts(data: any): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}?limit=${data.limit}&skip=${data.skip}&category=${data.category}`, FetchMethod.GET);
    }

    public static deleteMultiPost(postIds: string[]): Promise<IResponseType<IPostDataProps[]>> {
        return FetchApi(`${root}/${v1}/post/${multiDeletePosts}`, FetchMethod.DELETE, { postIds: postIds });
    }
}

export { PostService };
