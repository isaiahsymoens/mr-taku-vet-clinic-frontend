import {PetType} from "../models/petType";
import {JSONObject} from "../utils/json";

export const getPetTypes = async () => {
    const response = await fetch("https://localhost:5001/api/petTypes", {
        method: "GET"
    });
    return PetType.fromJSONArray((await response.json()).data as JSONObject[]);
}

