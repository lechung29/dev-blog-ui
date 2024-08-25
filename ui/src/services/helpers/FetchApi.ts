import { IFunc3 } from "../../types/Function";

export enum FetchMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const FetchApi: IFunc3<string, FetchMethod, any, Promise<any>> = async (url, method, body) => {
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
        return await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(body)
        }).then((response) => response.json())
    } catch (error: any) {
        return error.response.json();
    }
};
