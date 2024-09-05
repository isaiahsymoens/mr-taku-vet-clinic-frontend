import {createSlice} from "@reduxjs/toolkit";
import {Visit} from "../../models/visit";

type VisitState = {
    visits: Visit[];
}

const initialState: VisitState = {
    visits: []
}

const visitSlice = createSlice({
    name: "visit",
    initialState,
    reducers: {
        setVisits: (state, action) => {
            state.visits = action.payload;
        },
        addVisit: (state, action) => {
            state.visits.push(action.payload);
        },
        removeVisit: (state, action) => {
            state.visits = state.visits.filter(visit => visit.visitId !== action.payload);
        },
        updateVisit: (state, action) => {
            const updateVisit = action.payload;
            const index = state.visits.findIndex(visit => visit.visitId === updateVisit.visitId);
            if (index !== -1) {
                state.visits[index] = updateVisit;
            }
        }
    }
});

export const visitActions = visitSlice.actions;
export default visitSlice.reducer;