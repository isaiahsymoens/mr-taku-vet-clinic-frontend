import {JSONObject} from "../utils/json";
import {User} from "./user";

export class Visit {
    visitTypeId: number;
    petId: number;
    date: string;
    notes: string;
    user: User;

    constructor(
        visitTypeId: number,
        petId: number,
        date: string,
        notes: string,
        user: User
    ) {
        this.visitTypeId = visitTypeId;
        this.petId = petId;
        this.date = date;
        this.notes = notes;
        this.user = user;
    }

    static fromJSON(json: JSONObject): Visit {
        return new Visit (
            json["visitTypeId"] as number,
            json["petId"] as number,
            json["date"] as string,
            json["notes"] as string,
            User.fromJSON(json["user"] as JSONObject)
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): Visit[] {
        return jsonArray.map((visit: JSONObject) => Visit.fromJSON(visit));
    }
}