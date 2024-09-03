import {JSONObject} from "../utils/json";

export class Pet {
    petId: number;
    petName: string;
    petType: string;
    breed: string;
    birthDate: string;

    constructor(
        petId: number,
        petName: string,
        petType: string,
        breed: string,
        birthDate: string
    ) {
        this.petId = petId;
        this.petName = petName;
        this.petType = petType;
        this.breed = breed;
        this.birthDate = birthDate;
    }

    static fromJSON(json: JSONObject): Pet{
        return new Pet(
            json["petId"] as number,
            json["petName"] as string,
            json["petType"] as string,
            json["breed"] as string,
            json["birthDate"] as string
        );
    } 

    static fromJSONArray(jsonArray: JSONObject[]): Pet[] {
        return jsonArray.map((pet: JSONObject) => Pet.fromJSON(pet));
    }
}