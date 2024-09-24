import {configureStore} from "@reduxjs/toolkit";
import auth from "./features/auth";
import petReducer from "./features/pet";
import userReducer from "./features/user";
import visitReducer from "./features/visit";

const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
    reducer: {
        auth: auth,
        pet: petReducer,
        user: userReducer,
        visit: visitReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;