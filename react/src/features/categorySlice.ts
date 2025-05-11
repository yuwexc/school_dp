import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../interfaces/category";
import axios from "axios";
import { PROJECT_URL } from "../interfaces/requests";

interface CategoryState {
    categories: Category[] | null,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const initialState: CategoryState = {
    categories: null,
    status: null,
    error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<Category[]>(PROJECT_URL + '/categories', {
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

export const postCategory = createAsyncThunk<Category[], { category_name: string }>(
    'categories/postCategory',
    async (category_name, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<Category[]>(PROJECT_URL + '/categories', category_name, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось создать категорию!");
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        resetErrorAndStatus: (state) => {
            state.error = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            //get

            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                    state.status = 'failed';
                }
            })

            //post

            .addCase(postCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(postCategory.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                    state.status = 'failed';
                }
            })
    },
});

export const selectCategories = (state: { categories: CategoryState }) => state.categories.categories;
export const selectCategoriesStatus = (state: { categories: CategoryState }) => state.categories.status;
export const selectCategoriesError = (state: { categories: CategoryState }) => state.categories.error;
export const { resetErrorAndStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;