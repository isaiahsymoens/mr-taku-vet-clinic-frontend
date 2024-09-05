import {JSONObject} from "../utils/json";
import { User } from "./user";

export class Pet {
    petId: number;
    petName: string;
    petType?: string;
    petTypeId?: number;
    breed: string;
    birthDate?: string;
    numberOfVisits?: number;
    userDetails?: User;

    constructor(
        petId: number,
        petName: string,
        petType: string,
        petTypeId: number,
        breed: string,
        birthDate: string,
        numberOfVisits: number,
        userDetails: User
    ) {
        this.petId = petId;
        this.petName = petName;
        this.petType = petType;
        this.petTypeId = petTypeId;
        this.breed = breed;
        this.birthDate = birthDate;
        this.numberOfVisits = numberOfVisits;
        this.userDetails = userDetails;
    }

    static fromJSON(json: JSONObject): Pet{
        return new Pet(
            json["petId"] as number,
            json["petName"] as string,
            json["petType"] as string,
            json["petTypeId"] as number,
            json["breed"] as string,
            json["birthDate"] as string,
            json["numberOfVisits"] as number,
            User.fromJSON(json["user"] as JSONObject)
        );
    } 

    static fromJSONArray(jsonArray: JSONObject[]): Pet[] {
        return jsonArray.map((pet: JSONObject) => Pet.fromJSON(pet));
    }
}