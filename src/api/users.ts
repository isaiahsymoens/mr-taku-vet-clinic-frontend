import {User} from "../models/user";
import {extractErrorMessages, GenericErrorResponse} from "../utils/errorHelper";
import {JSONObject} from "../utils/json";

export type AddEditUserRequest = Omit<User, "petOwned">;

export const fetchUsers = async() => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "GET"
    });
    return User.fromJSONArray((await response.json()).data as JSONObject[]);
};

export const getUserByUsername = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/users/${username}`, {
        method: "GET"
    });
    return User.fromJSON((await response.json()).data as JSONObject);
};

export const getUserPasswordByUsername = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/users/userpassword/${username}`, {
        method: "GET"
    });
    return (await response.json()).data.password || "";
};

export const addUser = async (data: AddEditUserRequest) => {
    const response = await fetch(`https://localhost:5001/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw extractErrorMessages(json.errors as GenericErrorResponse);
    }
    return User.fromJSON(json.data as JSONObject);
}

export const updateUser = async (username: string, data: AddEditUserRequest) => {
    const response = await fetch(`https://localhost:5001/api/users/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (!response.ok) {
        throw extractErrorMessages(json.errors as GenericErrorResponse);
    }
    return User.fromJSON(json.data as JSONObject);
}

export const deleteUser = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/users/${username}`, {
        method: "DELETE"
    });
    if (!response.ok)
        console.log("error response :", await response.json());
}