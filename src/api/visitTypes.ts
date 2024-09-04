import {VisitType} from "../models/visitType";
import {JSONObject} from "../utils/json";

export const getVisitTypes = async () => {
    const response = await fetch("https://localhost:5001/api/visitTypes", {
        method: "GET"
    });
    return VisitType.fromJSONArray((await response.json()).data as JSONObject[]);
}