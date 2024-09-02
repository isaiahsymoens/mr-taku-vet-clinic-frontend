import {JSONObject} from "../utils/json";

export class User {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    userTypeId: number;
    active: boolean;

    constructor(
        firstName: string, 
        middleName: string, 
        lastName: string, 
        email: string, 
        username: string,
        password: string,
        userTypeId: number,
        active: boolean
    ) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.userTypeId = userTypeId;
        this.active = active;
    }

    static fromJSON(json: JSONObject): User{
        return new User(
            json["firstName"] as string,
            json["middleName"] as string,
            json["lastName"] as string,
            json["email"] as string,
            json["username"] as string,
            json["password"] as string,
            json["userTypeId"] as number,
            json["active"] as boolean,
        );
    }
}