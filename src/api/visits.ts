import {Visit} from "../models/visit";
import {JSONObject} from "../utils/json";

export const fetchVisits = async () => {
    const response = await fetch(`https://localhost:5001/api/visits`, {
        method: "GET"
    });
    return Visit.fromJSONArray((await response.json()).data as JSONObject[]);
}