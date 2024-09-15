import { IIdentityProps } from "./Post";

export interface ILoginType {
    email: string;
    password: string;
}

export interface IRegisterType extends ILoginType {
    displayName: string;
}

export interface IGoogleLoginType {
    email?: string;
    displayName?: string;
    avatar?: string;
}

export interface IUpdateUserProps {
    displayName?: string;
    email?: string;
    avatar?: string;
}

export interface IChangePasswordProps {
    currentPassword: string;
    newPassword: string;
}

export interface IUserInformation {
    _id: string;
    email: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    status: userStatus;
    role: "user" | "admin";
    avatar: string;
    accessToken: string;
}

export enum userStatus {
    active = "active",
    inactive = "locked",
}

export type IUserInformationWithId = IUserInformation & IIdentityProps


export interface IReferenceUser {
    _id: string;
    displayName: string;
    email: string;
    avatar: string;
}