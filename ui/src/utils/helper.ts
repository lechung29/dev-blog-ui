export interface IQueryObject {
    filter?: string;
    sort?: string;
    limit?: number;
    page?: number;
    search?: string;
}

export const ObjectToQuery = (object: IQueryObject) => {
    let query: string = ""
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
}