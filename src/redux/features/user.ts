import {createSlice} from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [
        {
            name: "Luffy D. Monkey",
            email: "monkeydluffy@gmail.com", 
            firstName: "Luffy", 
            username: "monkeydluffy", 
            petOwned: 0,
            middleName: "D.",
            lastName: "Monkey",
            userTypeId: 0,
            active: false
        }
    ]
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            // state.users.push(action.payload);
        },
        removeUser: (state, action) => {

        },
        updateUser: (state, action) => {

        },
        fetchUsers: (state, action) => {

        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;