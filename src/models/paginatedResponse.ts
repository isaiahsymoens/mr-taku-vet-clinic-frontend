import {JSONObject} from "../utils/json";

export class PaginatedResponse<T> {
    data: T[];
    nextPage: number;
    pageNumber: number;
    pageSize: number;
    previousPage?: number | null;
    succeded: boolean;
    totalItems: number;
    totalPages: number;

    constructor(
        data: T[],
        nextPage: number,
        pageNumber: number,
        pageSize: number,
        previousPage: number | null,
        succeded: boolean,
        totalItems: number,
        totalPages: number
    ) {
        this.data = data;
        this.nextPage = nextPage;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.previousPage = previousPage;
        this.succeded = succeded;
        this.totalItems = totalItems;
        this.totalPages = totalPages; 
    }

    static fromJSON<T>(json: JSONObject, itemContructor: (item: JSONObject) => T): PaginatedResponse<T>{
        return new PaginatedResponse(
            (json["data"] as JSONObject[]).map(itemContructor),
            json["nextPage"] as number,
            json["pageNumber"] as number,
            json["pageSize"] as number,
            json["previousPage"] as number,
            json["succeded"] as boolean,
            json["totalItems"] as number,
            json["totalPages"] as number,
        );
    }
}