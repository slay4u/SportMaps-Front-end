import { createSlice } from "@reduxjs/toolkit";

const markerSlice = createSlice({
    name: "marker",
    initialState: { title: null, label: null, lat: null, lng: null, currentState: ""},
    reducers: {
        addText: (state, action) => {
            const { title, label } = action.payload;
            state.title = title;
            state.label = label;
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
        clearEverything: (state, action) => {
            state.title = null;
            state.label = null;
            state.lat = null;
            state.lng = null
            state.currentState = "";
        },
    },
});

export const { addText, addLatLng, setCurrentState, clearEverything } = markerSlice.actions;
export default markerSlice.reducer