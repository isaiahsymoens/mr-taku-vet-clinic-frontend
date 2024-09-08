import {JSONObject} from "../utils/json";

export class VisitType {
    visitTypeId?: number;
    typeName?: string;

    constructor(visitTypeId: number, typeName: string){
        this.visitTypeId = visitTypeId;
        this.typeName = typeName;
    }

    static fromJSON(json: JSONObject) : VisitType {
        return new VisitType (
            json["visitTypeId"] as number,
            json["typeName"] as string,
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): VisitType[] {
        return jsonArray.map((visitType: JSONObject) => VisitType.fromJSON(visitType));
    }
}