import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { LoginInterface, PROJECT_URL } from "../interfaces/requests";
import { User } from "../interfaces/user";

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
    'api_token': null,
    'check_email': null,
    'created_at': null
}

const initialState: UserState = {
    user,
    token: null,
    status: null,
    error: null,
};

export const fetchUser = createAsyncThunk<User>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<User>(PROJECT_URL + '/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
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

export const loginUser = createAsyncThunk<string | null, LoginInterface>(
    'user/loginUser',
    async (user, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(PROJECT_URL + '/login', user);
            return data.token;

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.status === 404) {
                    return rejectWithValue(null)
                } else {
                    return rejectWithValue("Не удалось войти в систему!");
                }
            }
            return rejectWithValue(null);
        }
    }
)

export const logoutUser = createAsyncThunk<null>(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get(PROJECT_URL + '/logout', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });

            return data.token;

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.status === 404) {
                    return rejectWithValue(null)
                } else {
                    return rejectWithValue("Не удалось выйти из системы!");
                }
            }
            return rejectWithValue(null);
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
            })

            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string | null>) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                    state.status = null;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action: PayloadAction<null>) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(logoutUser.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                    state.status = null;
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