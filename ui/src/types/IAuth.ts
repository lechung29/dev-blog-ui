export interface ILoginType {
    email: string;
    password: string;
}

export interface IUserInformation {
    _id: string;
    email: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    role: "user" | "admin";
    avatar: string
}