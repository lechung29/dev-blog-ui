export enum IRequestStatus {
    Error,
    Success,
    Info
}

export interface IResponseDefault {
    requestStatus: IRequestStatus,
    message: string;
    fieldError?: string | string[];
}

export interface IResponseType<T extends any> {
    requestStatus: IRequestStatus,
    message: string;
    fieldError?: string | string[];
    data?: T
}