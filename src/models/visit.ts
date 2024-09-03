import {JSONObject} from "../utils/json";
import {User} from "./user";

export class Visit {
    visitTypeId: number;
    petId: number;
    date: string;
    notes: string;

    constructor(
        visitTypeId: number,
        petId: number,
        date: string,
        notes: string
    ) {
        this.visitTypeId = visitTypeId;
        this.petId = petId;
        this.date = date;
        this.notes = notes;
    }

    static fromJSON(json: JSONObject): Visit {
        return new Visit (
            json["visitTypeId"] as number,
            json["petId"] as number,
            json["date"] as string,
            json["notes"] as string
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): Visit[] {
        return jsonArray.map((visit: JSONObject) => Visit.fromJSON(visit));
    }
}