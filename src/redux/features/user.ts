import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/user";

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            // state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.username !== action.payload);
        },
        updateUser: (state, action) => {
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;