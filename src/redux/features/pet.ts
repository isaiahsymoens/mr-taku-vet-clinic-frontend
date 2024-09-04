import {createSlice} from "@reduxjs/toolkit";
import {Pet} from "../../models/pet";

type PetState = {
    pets: Pet[]
}

const initialState: PetState = {
    pets: []
}

const petSlice = createSlice({
    name: "pet",
    initialState,
    reducers: {
        addPet: (state, action) => {
            state.pets.push(action.payload);
        },
        removePet: (state, action) => {
            state.pets = state.pets.filter(pet => pet.petId !== action.payload);
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