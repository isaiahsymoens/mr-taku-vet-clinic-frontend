import dayjs, { Dayjs } from "dayjs";
import {JSONObject} from "../utils/json";
import {User} from "./user";
import {PetType} from "./petType";

export class Pet {
    petId?: number;
    petName: string;
    petType?: PetType;
    breed: string;
    birthDate: Dayjs | null;
    numberOfVisits?: number;
    user?: User;

    constructor(
        petId: number,
        petName: string,
        petType: PetType,
        breed: string,
        birthDate: Dayjs | null,
        numberOfVisits: number,
        user: User
    ) {
        this.petId = petId;
        this.petName = petName;
        this.petType = petType;
        this.breed = breed;
        this.birthDate = birthDate;
        this.numberOfVisits = numberOfVisits;
        this.user = user;
    }

    static fromJSON(json: JSONObject): Pet{
        return new Pet(
            json["petId"] as number,
            json["petName"] as string,
            PetType.fromJSON(json["petType"] as JSONObject),
            json["breed"] as string,
            json["birthDate"] ? dayjs(json["birthDate"] as string) : null,
            json["numberOfVisits"] as number,
            User.fromJSON(json["user"] as JSONObject)
        );
    } 

    static fromJSONArray(jsonArray: JSONObject[]): Pet[] {
        return jsonArray.map((pet: JSONObject) => Pet.fromJSON(pet));
    }
}