import {JSONObject} from "../utils/json";

export class PetType {
    petTypeId: number;
    typeName: string;

    constructor(petTypeId: number, typeName: string){
        this.petTypeId = petTypeId;
        this.typeName = typeName;
    }

    static fromJSON(json: JSONObject) : PetType {
        return new PetType (
            json["petTypeId"] as number,
            json["typeName"] as string,
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): PetType[] {
        return jsonArray.map((petType: JSONObject) => PetType.fromJSON(petType));
    }
}