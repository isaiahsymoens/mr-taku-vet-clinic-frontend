import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/user";

interface UserState {
    userProfile: User | null;
    users: User[];
}

const initialState: UserState = {
    userProfile: null!,
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users = [action.payload, ...state.users];
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