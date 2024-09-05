import { IReferenceUser } from "./IAuth";

export interface ICreateCommentParams {
    commentator: string;
    post: string;
    content: string;
}

export interface IReferenceComments {
    commentator: IReferenceUser;
    content: string;
    createdAt: string;
    like: string[];
    isLike: string;
    post: string;
    updatedAt: string;
    _id: string;
}