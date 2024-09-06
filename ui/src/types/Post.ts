import { IReferenceComments } from "./Comment";
import { IReferenceUser } from "./IAuth";

export interface ICreatePost {
    title: string;
    category: string;
    tags: string[];
    thumbnail: string;
    content: string;
}

export interface ISingleDeletePost {
    userId: string;
    postId: string
}

export interface IUpdatePostStatus {
    status: IPostStatus;
    postId: string;
}

export interface IPostDataProps {
    _id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail: string;
    content: string;
    author: IReferenceUser;
    tags: string[];
    comments: IReferenceComments[]
    status: string;
    like: string[];
    isLike: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IPostProps {
    _id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail: string;
    content: string;
    author: string;
    tags: string[];
    comments: IReferenceComments[]
    status: IPostStatus;
    createdAt: string;
    updatedAt: string;
    like: string[];
    isLike: boolean;
}

export interface IIdentityProps {
    id: string;
}

export enum IPostStatus {
    Public = "Public",
    Pending = "Pending",
    Hide = "Hide",
}


