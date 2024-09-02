import {configureStore} from "@reduxjs/toolkit";
import petReducer from "./features/pet";
import userReducer from "./features/user";
import visitReducer from "./features/visit";

const store = configureStore({
    reducer: {
        pet: petReducer,
        user: userReducer,
        visit: visitReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;