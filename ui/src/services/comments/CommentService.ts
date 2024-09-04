import { ICreateCommentParams } from "../../types/Comment";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { createComment, root, v1 } from "../helpers/QueryString";

class CommentService {
    public static createComment(params: ICreateCommentParams): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/comment/${createComment}`, FetchMethod.POST, params);
    }
}

export { CommentService };