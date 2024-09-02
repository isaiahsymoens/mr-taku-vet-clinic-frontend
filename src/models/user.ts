import {JSONObject} from "../utils/json";

export class User {
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    password?: string;
    userTypeId: number;
    active: boolean;
    petOwned: number;

    constructor(
        name: string,
        firstName: string, 
        middleName: string, 
        lastName: string, 
        email: string, 
        username: string,
        password: string,
        userTypeId: number,
        active: boolean,
        petOwned: number
    ) {
        this.name = name,
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.userTypeId = userTypeId;
        this.active = active;
        this.petOwned = petOwned;
    }

    static fromJSON(json: JSONObject): User{
        return new User(
            json["name"] as string,
            json["firstName"] as string,
            json["middleName"] as string,
            json["lastName"] as string,
            json["email"] as string,
            json["username"] as string,
            json["password"] as string,
            json["userTypeId"] as number,
            json["active"] as boolean,
            json["petOwned"] as number,
        );
    }

    static fromJSONArray(jsonArray: JSONObject[]): User[] {
        return jsonArray.map((user: JSONObject) => User.fromJSON(user));
    }
}