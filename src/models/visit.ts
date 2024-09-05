import {Dayjs} from "dayjs";
import {JSONObject} from "../utils/json";
import {Pet} from "./pet";

export class Visit {
    visitTypeId?: number;
    visitType?: string;
    petId: number;
    date?: Dayjs | null;
    notes: string;
    petDetails?: Pet;

    constructor(
        visitTypeId: number,
        visitType: string,
        petId: number,
        date: Dayjs | null,
        notes: string,
        petDetails: Pet
    ) {
        this.visitTypeId = visitTypeId;
        this.visitType = visitType;
        this.petId = petId;
        this.date = date;
        this.notes = notes;
        this.petDetails = petDetails;
    }

    static fromJSON(json: JSONObject): Visit {
        return new Visit (
            json["visitTypeId"] as number,
            json["visitType"] as string,
            json["petId"] as number,
            json["date"] as Dayjs | null,
            json["notes"] as string,
            Pet.fromJSON(json["pet"] as JSONObject)
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): Visit[] {
        return jsonArray.map((visit: JSONObject) => Visit.fromJSON(visit));
    }
}