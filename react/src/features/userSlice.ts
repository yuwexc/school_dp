import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../interfaces/requests";

interface UserState {
    user: User,
    token: string | null,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const user: User = {
    'first_name': null,
    'last_name': null,
    'middle_name': null,
    'phone': null,
    'email': null,
    'photo': null,
    'level_id': null,
    'password': null,
    'remember_token': null,
    'check_email': null,
    'created_at': null
}

const initialState: UserState = {
    user,
    token: null,
    status: null,
    error: null,
};

export const PROJECT_URL: string = "https://dp-chernaev.xn--80ahdri7a.site/api";

export const fetchUser = createAsyncThunk<User>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<User>(PROJECT_URL);
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить пользователя!");
        }
    }
);

export const postUser = createAsyncThunk<string | null, User>(
    'user/postUser',
    async (user, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(PROJECT_URL + '/users', user);
            return data.token;

        } catch {
            return rejectWithValue("Не удалось зарегистрироваться!");
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get

            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            //post

            .addCase(postUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postUser.fulfilled, (state, action: PayloadAction<string | null>) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(postUser.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            });
    },
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectToken = (state: { user: UserState }) => state.user.token;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;