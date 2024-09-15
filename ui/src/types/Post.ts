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
    isFavorite: boolean;
    isLike: boolean;
    totalLikes: number;
    totalFavorites: number;
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
    totalLikes: number;
    createdAt: string;
    updatedAt: string;
    like: string[];
    isLike: boolean;
    isFavorite: boolean;
    totalFavorites: number;
}

export interface IIdentityProps {
    id: string;
}

export enum IPostStatus {
    Public = "Public",
    Pending = "Pending",
    Hide = "Hide",
}

export interface IOverViewProps {
    totalPosts: number;
    totalLikes: number;
    postInCurrentMonth: number;
    postByMonth: IPostByMonthProps[];
    postByCategory: IPostByCategoryProps[];
}

export interface IPostByCategoryProps {
    label: string;
    value: number;
    id: number
}

export interface IPostByMonthProps {
    month: string;
    post: number
}


