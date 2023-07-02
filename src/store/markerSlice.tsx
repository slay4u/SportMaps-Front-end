import { createSlice } from "@reduxjs/toolkit";

const markerSlice = createSlice({
    name: "marker",
    initialState: { title: null, label: null, lat: null, lng: null, description: null, currentState: ""},
    reducers: {
        addText: (state, action) => {
            const { title, label, description } = action.payload;
            state.title = title;
            state.label = label;
            state.description = description;
        },
        addLatLng: (state, action) => {
            const { lat, lng } = action.payload;
            state.lat = lat;
            state.lng = lng;
        },
        setCurrentState: (state, action) => {
            const { currentState } = action.payload;
            state.currentState = currentState;
        },
        clearEverything: (state) => {
            state.title = null;
            state.label = null;
            state.lat = null;
            state.lng = null
            state.description = null;
            state.currentState = "";
        },
    },
});

export const { addText, addLatLng, setCurrentState, clearEverything } = markerSlice.actions;
export default markerSlice.reducer