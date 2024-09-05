import {Visit} from "../models/visit";
import {JSONObject} from "../utils/json";

export interface AddVisitRequest extends Omit<Visit, "visitType"> {
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

export const addVisit = async (data: AddVisitRequest) => {
    const response = await fetch("https://localhost:5001/api/visits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return Visit.fromJSON((await response.json()).data as JSONObject);
}