import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    limit: 3,
};

export const lessonsLimitSlice = createSlice({
    name: "lessonsLimit",
    initialState,
    reducers: {
        getLimit: (state) => {
            state.limit = 4;
        },
        changeLimit: (state) => {
            state.limit += 4;
        },
    },
});

export const { getLimit, changeLimit } = lessonsLimitSlice.actions;
export default lessonsLimitSlice.reducer;