import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/userSlice';
import achievementsSlice from './features/achievementsSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        achievements: achievementsSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
