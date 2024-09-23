import {createSlice} from "@reduxjs/toolkit";
import {Visit} from "../../models/visit";

type VisitState = {
    visits: Visit[];
    closeFilter: boolean;
    resetFilter: boolean;
}

const initialState: VisitState = {
    visits: [],
    closeFilter: false,
    resetFilter: false
}

const visitSlice = createSlice({
    name: "visit",
    initialState,
    reducers: {
        setVisits: (state, action) => {
            state.visits = action.payload;
        },
        addVisit: (state, action) => {
            state.visits = [action.payload, ...state.visits];
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
        },
        setCloseFilter: (state, action) => {
            state.closeFilter = action.payload;
        },
        setResetFilter: (state, action) => {
            state.resetFilter = action.payload;
        }
    }
});

export const visitActions = visitSlice.actions;
export default visitSlice.reducer;