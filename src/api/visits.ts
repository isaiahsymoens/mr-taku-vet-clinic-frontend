import {PaginatedResponse} from "../models/paginatedResponse";
import {Visit} from "../models/visit";
import {VisitFilterModel} from "../pages/Visits/VisitFilterForm";
import {JSONObject} from "../utils/json";

export interface AddEditVisitRequest extends Omit<Visit, "visitType"> {
    owner: string;
    visitTypeId: number;
    petId: number;
}

export const fetchVisits = async (pageNumber?: number, sortBy?: string, isAscending?: boolean) => {
    const response = await fetch(`https://localhost:5001/api/visits/paginated?pageNumber=${pageNumber ?? 1}${sortBy ? `&sortBy=${sortBy}` : ""}${sortBy ? `&ascending=${isAscending}` : ""}`, {
        method: "GET"
    });
    return PaginatedResponse.fromJSON((await response.json()).data, Visit.fromJSON);
}

export const getPetVisits = async (id: number, pageNumber?: number) => {
    const response = await fetch(`https://localhost:5001/api/visits/petvisits/${id}?pageNumber=${pageNumber ?? 1}`, {
        method: "GET"
    });
    return PaginatedResponse.fromJSON((await response.json()).data, Visit.fromJSON);
}

export const searchVisits = async (data: VisitFilterModel, sortBy?: string, isAscending?: boolean) => {
    // if (data.hasOwnProperty("visitDateFrom") && !data.hasOwnProperty("visitDateTo")) {
    //     data = {...data, visitDateTo: data.visitDateFrom}
    // }
    const response = await fetch(`https://localhost:5001/api/visits/search?${sortBy ? `sortBy=${sortBy}` : ""}${sortBy ? `&ascending=${isAscending}` : ""}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return PaginatedResponse.fromJSON((await response.json()).data, Visit.fromJSON);
}

export const addVisit = async (data: AddEditVisitRequest) => {
    const response = await fetch("https://localhost:5001/api/visits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return Visit.fromJSON((await response.json()).data as JSONObject);
}

export const updateVisit = async (data: Visit) => {
    const response = await fetch(`https://localhost:5001/api/visits/${data.visitId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return Visit.fromJSON((await response.json()).data as JSONObject);
}

export const deleteVisit = async (id: number) => {
    const response = await fetch(`https://localhost:5001/api/visits/${id}`, {
        method: "DELETE"
    });
    if (!response.ok)
        console.log("error response :", await response.json());
}