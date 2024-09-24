import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/user";

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;