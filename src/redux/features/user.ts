import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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

        },
        updateUser: (state, action) => {

        },
        fetchUsers: (state, action) => {

        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;