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
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.username !== action.payload);
        },
        updateUser: (state, action) => {
            const updateUser = action.payload;
            const index = state.users.findIndex(user => user.username === updateUser.username);
            if (index !== -1) {
                state.users[index] = updateUser;
            }
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;