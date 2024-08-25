import { IReferenceUser } from "./IAuth";

export interface ICreatePost {
    title: string;
    category: string;
    tags: string[];
    thumbnail: string;
    content: string;
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
    comment: string[]
    status: string;
    createdAt: Date;
    updatedAt: Date;
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
    comment: string[]
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IIdentityProps {
    id: string;
}