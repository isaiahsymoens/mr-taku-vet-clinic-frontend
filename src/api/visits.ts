import {Visit} from "../models/visit";
import {JSONObject} from "../utils/json";

export interface AddEditVisitRequest extends Omit<Visit, "visitType"> {
    owner: string;
    visitTypeId: number;
    petId: number;
}

export const fetchVisits = async () => {
    const response = await fetch(`https://localhost:5001/api/visits`, {
        method: "GET"
    });
    return Visit.fromJSONArray((await response.json()).data as JSONObject[]);
}

export const getPetVisits = async (id: number) => {
    const response = await fetch(`https://localhost:5001/api/visits/petvisits/${id}`, {
        method: "GET"
    });
    return Visit.fromJSONArray((await response.json()).data as JSONObject[]);
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