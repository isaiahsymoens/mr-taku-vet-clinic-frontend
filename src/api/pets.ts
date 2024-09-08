import {Pet} from "../models/pet";
import {JSONObject} from "../utils/json";

export interface AddEditPetRequest extends Omit<Pet, "petType"> {
    username: string,
    petTypeId: number
}

export const getUserPetsByUsername = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/pets/username/${username}`, {
        method: "GET"
    });
    return Pet.fromJSONArray((await response.json()).data as JSONObject[]);
}

export const addPet = async (data: AddEditPetRequest) => {
    const response = await fetch(`https://localhost:5001/api/pets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });    
    return Pet.fromJSON((await response.json()).data as JSONObject);
}

export const updatePet = async (data: Pet) => {
    const response = await fetch(`https://localhost:5001/api/pets/${data.petId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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