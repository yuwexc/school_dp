import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseItemInterface } from "../interfaces/course";
import { PROJECT_URL } from "../interfaces/requests";
import axios from "axios";

interface CoursesState {
    myCourses: CourseItemInterface[] | null,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const initialState: CoursesState = {
    myCourses: null,
    status: null,
    error: null,
};

export const fetchMyCourses = createAsyncThunk<CourseItemInterface[]>(
    'user/fetchMyCourses',
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<CourseItemInterface[]>(PROJECT_URL + '/my-courses', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить курсы!");
        }
    }
);

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get

            .addCase(fetchMyCourses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMyCourses.fulfilled, (state, action: PayloadAction<CourseItemInterface[] | null>) => {
                state.status = 'succeeded';
                state.myCourses = action.payload;
            })
            .addCase(fetchMyCourses.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })
    },
});

export const selectMyCourses = (state: { courses: CoursesState }) => state.courses.myCourses;
export const selectMyCourseStatus = (state: { courses: CoursesState }) => state.courses.status;
export const selectMyCourseError = (state: { courses: CoursesState }) => state.courses.error;

export default coursesSlice.reducer;