import { ICreateCommentParams } from "../../types/Comment";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createComment, likeComment, root, v1 } from "../helpers/QueryString";

class CommentService {
    public static createComment(params: ICreateCommentParams): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${createComment}`, FetchMethod.POST, params);
    }

    public static likeComment(commentId: string): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${likeComment}/${commentId}`, FetchMethod.PUT);
    }
}

export { CommentService };