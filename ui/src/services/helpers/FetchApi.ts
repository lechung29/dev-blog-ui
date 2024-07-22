import axios from "axios";
import { IFunc3 } from "../../types/Function";

export enum FetchMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export type FetchUrl = string;

export const FetchApi: IFunc3<FetchUrl, FetchMethod, any, Promise<any>> = async (url, method, body) => {
    try {
        let response: any;
        switch (method) {
            case FetchMethod.GET:
                response = await axios.get(url);
                break;
            case FetchMethod.POST:
                response = await axios.post(url, body);
                break;
            case FetchMethod.PUT:
                response = await axios.put(url, body);
                break;
            case FetchMethod.DELETE:
                response = await axios.delete(url, body);
                break;
            default:
                break;
        }
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};
