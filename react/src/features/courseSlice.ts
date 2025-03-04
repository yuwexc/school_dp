import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseItemInterface } from "../interfaces/course";
import { PROJECT_URL } from "../interfaces/requests";
import axios from "axios";
import CourseAccessItemInterface from "../interfaces/course_access";

export interface Request {
    pageIndex: number,
    level_id: number | '',
    category_id: number | ''
}

export interface Courses {
    courses: CourseItemInterface[] | null,
    currentPage: number,
    pageSize: number,
    totalPages: number,
}

export interface CoursesState {
    myCourses: CourseItemInterface[] | null,
    courses: Courses | null,
    course: CourseItemInterface | null,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null,
}

const courses: Courses = {
    courses: null,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
}

const initialState: CoursesState = {
    myCourses: null,
    courses,
    course: null,
    status: null,
    error: null,
};

export const fetchMyCoursesItem = createAsyncThunk<CourseItemInterface, string>(
    'courses/fetchMyCoursesItem',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<CourseItemInterface>(PROJECT_URL + '/courses/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить курс!");
        }
    }
);

export const fetchCourses = createAsyncThunk<Courses, Request>(
    'courses/fetchCourses',
    async ({ pageIndex, level_id, category_id }, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<Courses>(PROJECT_URL + '/courses?pageIndex=' + pageIndex + '&pageSize=6' +
                '&level_id=' + level_id + '&category_id=' + category_id, {
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

export const fetchMyCourses = createAsyncThunk<CourseItemInterface[]>(
    'courses/fetchMyCourses',
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

export const requestAddMyCoursesItem = createAsyncThunk<CourseAccessItemInterface, string>(
    'courses/requestAddMyCoursesItem',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<CourseAccessItemInterface>(PROJECT_URL + '/my-courses/' + id + '/request', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось создать заявку на курс!");
        }
    }
);

export const deleteMyCoursesItem = createAsyncThunk<string, string>(
    'courses/deleteMyCoursesItem',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.delete<string>(PROJECT_URL + '/my-courses/delete/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось удалить заявку на курс!");
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

            //item

            .addCase(fetchMyCoursesItem.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMyCoursesItem.fulfilled, (state, action: PayloadAction<CourseItemInterface | null>) => {
                state.status = 'succeeded';
                state.course = action.payload;
                state.myCourses = Array(action.payload!);
            })
            .addCase(fetchMyCoursesItem.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            //list

            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Courses>) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

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

            //post

            .addCase(requestAddMyCoursesItem.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(requestAddMyCoursesItem.fulfilled, (state, action: PayloadAction<CourseAccessItemInterface>) => {
                state.status = 'succeeded';
                const id = state.myCourses!.findIndex(item => item.id_course === action.payload.course_id);
                state.myCourses![id].access = action.payload;
            })
            .addCase(requestAddMyCoursesItem.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            //delete

            .addCase(deleteMyCoursesItem.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteMyCoursesItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.course!.access!.access_status = '';
                state.myCourses = state.myCourses!.filter((el) => el.access?.id_course_access !== action.payload);
            })
            .addCase(deleteMyCoursesItem.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })
    },
});

export const selectMyCourses = (state: { courses: CoursesState }) => state.courses.myCourses;
export const selectCoursesItem = (state: { course: CoursesState }) => state.course.course;
export const selectMyCourseStatus = (state: { courses: CoursesState }) => state.courses.status;
export const selectMyCourseError = (state: { courses: CoursesState }) => state.courses.error;

export default coursesSlice.reducer;