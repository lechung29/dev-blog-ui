import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createPost, getAllPost, root, v1 } from "../helpers/QueryString";

class PostService {
    public static createPost(): Promise<any> {
        return FetchApi(`${root}/${v1}/post/${createPost}`, FetchMethod.POST)
    }
    public static getPosts(data: any): Promise<any> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}?limit=${data.limit}`, FetchMethod.GET)
    }
}

export { PostService };