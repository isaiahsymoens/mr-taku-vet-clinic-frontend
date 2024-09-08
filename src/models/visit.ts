import dayjs, {Dayjs} from "dayjs";
import {JSONObject} from "../utils/json";
import {Pet} from "./pet";
import {VisitType} from "./visitType";

export class Visit {
    visitId?: number;
    visitType?: VisitType;
    date: Dayjs | null;
    notes: string;
    pet?: Pet;

    constructor(
        visitId: number,
        visitType: VisitType,
        date: Dayjs | null,
        notes: string,
        pet: Pet
    ) {
        this.visitId = visitId;
        this.visitType = visitType;
        this.date = date;
        this.notes = notes;
        this.pet = pet;
    }

    static fromJSON(json: JSONObject): Visit {
        return new Visit (
            json["visitId"] as number,
            VisitType.fromJSON(json["visitType"] as JSONObject),
            json["date"] ? dayjs(json["date"] as string) : null,
            json["notes"] as string,
            Pet.fromJSON(json["pet"] as JSONObject)
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): Visit[] {
        return jsonArray.map((visit: JSONObject) => Visit.fromJSON(visit));
    }
}