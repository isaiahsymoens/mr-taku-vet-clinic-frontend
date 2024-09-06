import {User} from "../models/user";
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

export const addUser = async (data: AddEditUserRequest) => {
    const response = await fetch(`https://localhost:5001/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
    // return User.fromJSON((await response.json()).data as JSONObject);
}

export const updateUser = async (data: User) => {
    const response = await fetch(`https://localhost:5001/api/users/${data.username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return User.fromJSON((await response.json()).data as JSONObject);
}

export const deleteUser = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/users/${username}`, {
        method: "DELETE"
    });
    if (!response.ok)
        console.log("error response :", await response.json());
}