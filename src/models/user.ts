import {JSONObject} from "../utils/json";

export class User {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    username: string;
    password?: string;
    active: boolean;
    petOwned: number;

    constructor(
        firstName: string, 
        middleName: string, 
        lastName: string, 
        email: string, 
        username: string,
        password: string,
        active: boolean,
        petOwned: number
    ) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.active = active;
        this.petOwned = petOwned;
    }

    get name(): string {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }

    static fromJSON(json: JSONObject): User{
        return new User(
            json["firstName"] as string,
            json["middleName"] as string,
            json["lastName"] as string,
            json["email"] as string,
            json["username"] as string,
            json["password"] as string,
            json["active"] as boolean,
            json["petOwned"] as number,
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): User[] {
        return jsonArray.map((user: JSONObject) => User.fromJSON(user));
    }
}