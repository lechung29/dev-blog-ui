import { handleUnauthorized } from "../../redux/reducers/auth/AuthSlice";
import { store } from "../../redux/store/store";
import { IFunc3 } from "../../types/Function";

export enum FetchMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const FetchApi: IFunc3<string, FetchMethod, any, Promise<any>> = async (url, method, body) => {
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
            store.dispatch(handleUnauthorized(errorMessage.message));
            throw new Error(errorMessage.message);
        } else {
            return await response.json();
        }
    } catch (error: any) {
        console.log(error)
        return error;
    }
};
