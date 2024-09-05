import {Dayjs} from "dayjs";
import {JSONObject} from "../utils/json";
import {Pet} from "./pet";

export class Visit {
    visitType: string;
    date: Dayjs | null;
    notes: string;
    pet?: Pet;

    constructor(
        visitType: string,
        date: Dayjs | null,
        notes: string,
        pet: Pet
    ) {
        this.visitType = visitType;
        this.date = date;
        this.notes = notes;
        this.pet = pet;
    }

    static fromJSON(json: JSONObject): Visit {
        return new Visit (
            json["visitType"] as string,
            json["date"] as Dayjs | null,
            json["notes"] as string,
            Pet.fromJSON(json["pet"] as JSONObject)
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): Visit[] {
        return jsonArray.map((visit: JSONObject) => Visit.fromJSON(visit));
    }
}