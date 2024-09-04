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

export interface IUserInformation {
    _id: string;
    email: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    role: "user" | "admin";
    avatar: string;
    accessToken: string;
}


export interface IReferenceUser {
    _id: string;
    displayName: string;
    email: string;
    avatar: string;
}