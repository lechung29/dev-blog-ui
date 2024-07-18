import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { getAllPost, root, v1 } from "../helpers/QueryString";

class PostService {
    public static getPosts(data: any): Promise<any> {
        return FetchApi(`${root}/${v1}/post/${getAllPost}?limit=${data.limit}`, FetchMethod.GET)
    }
}

export { PostService };