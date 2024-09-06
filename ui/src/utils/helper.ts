export interface IQueryObject {
    filter?: string;
    sort?: string;
    limit?: number;
    page?: number;
    search?: string;
}

export interface IQueryGetMaxPage {
    filter?: string;
    limit?: number;
    search?: string;
}

export const ObjectToQuery = (object: IQueryObject) => {
    let query: string = "";
    if (object.filter) {
        query += "filter=" + encodeURIComponent(object.filter) + "&";
    }
    if (object.sort) {
        query += "sort=" + encodeURIComponent(object.sort) + "&";
    }
    if (object.limit) {
        query += "limit=" + encodeURIComponent(object.limit.toString()) + "&";
    }
    if (object.page) {
        query += "page=" + encodeURIComponent(object.page.toString()) + "&";
    }
    if (object.search) {
        query += "search=" + encodeURIComponent(object.search) + "&";
    }
    if (query) {
        query = "?" + query;
    }
    return query;
};

export const ObjectToString = (object: Object) => {
    let result = "";
    let currentKey = 0;

    for (const key in object) {
        currentKey++;
        if (currentKey === Object.keys(object).length) {
            result += key + " " + object[key];
        } else {
            result += key + " " + object[key] + " ";
        }
    }
    return result
};
