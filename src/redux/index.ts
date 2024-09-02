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

export default store;