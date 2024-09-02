import {User} from "../models/user";
import {JSONObject} from "../utils/json";

export const fetchUsers = async () => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "GET"
    });
    return User.fromJSONArray((await response.json()).data as JSONObject[]);
}