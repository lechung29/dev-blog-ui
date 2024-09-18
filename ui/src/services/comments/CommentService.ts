import { ICreateCommentParams } from "../../types/Comment";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createComment, deleteComment, likeComment, root, updateComment, v1 } from "../helpers/QueryString";

class CommentService {
    public static createComment(params: ICreateCommentParams): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${createComment}`, FetchMethod.POST, params);
    }

    public static updateComment(commentId: string, userId: string, content: string): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${updateComment}/${commentId}`, FetchMethod.PUT, { commentator: userId, content });
    }

    public static deleteComment(commentId: string, userId: string): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${deleteComment}/${commentId}`, FetchMethod.DELETE, { commentator: userId });
    }

    public static likeComment(commentId: string): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${likeComment}/${commentId}`, FetchMethod.PUT);
    }
}

export { CommentService };
