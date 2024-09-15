import { IFetch } from "../../types/Function";

export enum FetchMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const FetchApi: IFetch<string, FetchMethod, any, Function, Promise<any>> = async (url, method, body, handleUnauthorized) => {
    try {
        const access_token = localStorage.getItem("access_token");
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (response.status === 401) {
            const errorMessage = await response.json();
            handleUnauthorized?.(errorMessage.message);
            throw new Error(errorMessage.message);
        } else {
            return await response.json();
        }
    } catch (error: any) {
        return error;
    }
};
