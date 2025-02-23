import { ICreateCommentParams } from "../../types/Comment";
import { IResponseType } from "../../types/IResponse";
import instance from "../config/axios";
import { createComment, deleteComment, likeComment, root, updateComment, v1 } from "../helpers/QueryString";

class CommentService {
    public static createComment(params: ICreateCommentParams): Promise<IResponseType<any>> {
        return instance.post(`${root}/${v1}/comment/${createComment}`, params);
    }

    public static updateComment(commentId: string, userId: string, content: string): Promise<IResponseType<any>> {
        return instance.put(`${root}/${v1}/comment/${updateComment}/${commentId}`, { commentator: userId, content });
    }

    public static deleteComment(commentId: string, userId: string): Promise<IResponseType<any>> {
        return instance.delete(`${root}/${v1}/comment/${deleteComment}/${commentId}/${userId}`);
    }

    public static likeComment(commentId: string): Promise<IResponseType<any>> {
        return instance.put(`${root}/${v1}/comment/${likeComment}/${commentId}`);
    }
}

export { CommentService };
