import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Stats } from '../interfaces/stats';
import { PROJECT_URL } from '../interfaces/requests';

interface AdminState {
    stats: Stats | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AdminState = {
    stats: null,
    status: 'idle',
    error: null
};

export const fetchAdminStats = createAsyncThunk(
    'admin/fetchStats',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<Stats>(PROJECT_URL + '/stats', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить статистику!");
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdminStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stats = action.payload;
            })
            .addCase(fetchAdminStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch admin stats';
            });
    }
});

export default adminSlice.reducer;