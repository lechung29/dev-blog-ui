export enum IRequestStatus {
    Error,
    Success,
    Info
}

export interface IResponseType<T extends any> {
    requestStatus: IRequestStatus,
    message: string;
    fieldError?: string | string[];
    data?: T
}