// import axios from "axios";
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
        const access_token = localStorage.getItem('access_token');

        // switch (method) {
        //     case FetchMethod.GET:
        //         response = await axios.get(url, headers);
        //         break;
        //     case FetchMethod.POST:
        //         response = await axios.post(url, headers, body);
        //         break;
        //     case FetchMethod.PUT:
        //         response = await axios.put(url, headers, body);
        //         break;
        //     case FetchMethod.DELETE:
        //         response = await axios.delete(url, headers);
        //         break;
        //     default:
        //         break;
        // }
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(body)
        }).then((response) => response.json())
        return response;
    } catch (error: any) {
        return error.response.json();
    }
};
