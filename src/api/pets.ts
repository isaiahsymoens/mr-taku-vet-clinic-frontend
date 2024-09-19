import {PaginatedResponse} from "../models/paginatedResponse";
import {Pet} from "../models/pet";
import {extractErrorMessages, GenericErrorResponse} from "../utils/errorHelper";
import {JSONObject} from "../utils/json";

export interface AddEditPetRequest extends Omit<Pet, "petType"> {
    username: string,
    petTypeId: number
}

export const getUserPetsByUsername = async (username: string) => {
    const response = await fetch(`https://localhost:5001/api/pets/${username}`, {
        method: "GET"
    });
    return Pet.fromJSONArray((await response.json()).data as JSONObject[]);
}

export const getPaginatedUserPetsByUsername = async (username: string, pageNumber?: number, sortBy?: string, isAscending?: boolean) => {
    const response = await fetch(`https://localhost:5001/api/pets/paginated/${username}?pageNumber=${pageNumber ?? 1}${sortBy ? `&sortBy=${sortBy}` : ""}${sortBy ? `&ascending=${isAscending}` : ""}`, {
        method: "GET"
    });
    return PaginatedResponse.fromJSON((await response.json()).data, Pet.fromJSON);
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
        throw extractErrorMessages((await response.json()).errors as GenericErrorResponse);
}