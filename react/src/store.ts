import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/userSlice';
import achievementsSlice from './features/achievementsSlice';
import coursesSlice from './features/courseSlice';
import modalSlice from './features/modalSlice';
import lessonsLimitSlice from "./features/lessonsLimit";

const store = configureStore({
    reducer: {
        user: userSlice,
        achievements: achievementsSlice,
        courses: coursesSlice,
        modal: modalSlice,
        lessonsLimit: lessonsLimitSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
