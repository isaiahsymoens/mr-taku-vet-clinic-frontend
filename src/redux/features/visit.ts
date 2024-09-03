import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visits: []
}

const visitSlice = createSlice({
    name: "visit",
    initialState,
    reducers: {
        addVisit: (state, action) => {
            
        },
        removeVisit: (state, action) => {

        },
        updateVisit: (state, action) => {

        },
        fetchVisits: (state, action) => {

        }
    }
});

export const visitActions = visitSlice.actions;
export default visitSlice.reducer;