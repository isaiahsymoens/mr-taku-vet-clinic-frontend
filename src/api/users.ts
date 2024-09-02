import {User} from "../models/user";
import {JSONObject} from "../utils/json";

export const fetchUsers = async () => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "GET"
    });
    return User.fromJSONArray((await response.json()).data as JSONObject[]);
}

export const addUser = async (data: User) => {
    const response = await fetch("https://localhost:5001/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log("add response :", response);
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
    console.log("delete response :", response);
}