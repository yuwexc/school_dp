import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PROJECT_URL } from "../interfaces/requests";
import axios from "axios";
import { AchievementItemInterface } from "../interfaces/achievement";

interface AchievementState {
    achievements: AchievementItemInterface[] | null,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const initialState: AchievementState = {
    achievements: null,
    status: null,
    error: null,
};

export const fetchAchievement = createAsyncThunk<AchievementItemInterface[]>(
    'achievements/fetchAchievement',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<AchievementItemInterface[]>(PROJECT_URL + '/dashboard', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить достижения!");
        }
    }
);

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get

            .addCase(fetchAchievement.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAchievement.fulfilled, (state, action: PayloadAction<AchievementItemInterface[]>) => {
                state.status = 'succeeded';
                state.achievements = action.payload;
            })
            .addCase(fetchAchievement.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })
    },
});

export const selectAchievements = (state: { achievements: AchievementState }) => state.achievements.achievements;
export const selectAchievementStatus = (state: { achievements: AchievementState }) => state.achievements.status;
export const selectAchievementError = (state: { achievements: AchievementState }) => state.achievements.error;

export default achievementsSlice.reducer;