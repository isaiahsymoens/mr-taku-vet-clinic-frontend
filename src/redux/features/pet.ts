import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pets: []
}

const petSlice = createSlice({
    name: "pet",
    initialState,
    reducers: {
        addPet: (state, action) => {
            
        },
        removePet: (state, action) => {

        },
        updatePet: (state, action) => {

        },
        storePets: (state, action) => {
            state.pets = action.payload;
        }
    }
});

export const petActions = petSlice.actions;
export default petSlice.reducer;