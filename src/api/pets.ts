import {Pet} from "../models/pet";
import {JSONObject} from "../utils/json";

export const getUserPetsByUsername = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/pets/username/${username}`, {
        method: "GET"
    });
    return Pet.fromJSONArray((await response.json()).data as JSONObject[]);
}

export const addPet = async (data: any) => {
    const response = await fetch(`https://localhost:5001/api/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: data.username,
            petTypeId: data.petType,
            petName: data.petName,
            breed: data.breed,
            birthdate: data.birthDate,
        })
    });    
    return Pet.fromJSON((await response.json()).data as JSONObject);
}

export const deletePet = async (petId: number) => {
    const response = await fetch(`https://localhost:5001/api/pets/${petId}`, {
        method: "DELETE"
    });
    if (!response.ok)
        console.log("error response :", await response.json());
}