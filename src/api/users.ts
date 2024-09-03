import {User} from "../models/user";
import {JSONObject} from "../utils/json";

export type AddUser = Omit<User, "petOwned">;

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

export const addUser = async (data: AddUser) => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export const updateUser = async (data: User) => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log("edit response :", response);
}

export const deleteUser = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/users/${username}`, {
        method: "DELETE"
    });
    if (!response.ok)
        console.log("error response :", await response.json());
}