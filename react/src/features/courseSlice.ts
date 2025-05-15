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

export const postCourse = createAsyncThunk<CourseItemInterface, { course_name: string, course_description: string, level_id: number, category_id: number }>(
    'courses/postCourse',
    async (course, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<CourseItemInterface>(PROJECT_URL + '/courses/create', course, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось создать курс!");
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

export const updateCourse = createAsyncThunk<CourseItemInterface, { id: string, formData: FormData }>(
    'courses/updateCourse',
    async (course, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<CourseItemInterface>(PROJECT_URL + '/courses/' + course.id, course.formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
                    "Content-Type": 'multipart/form-data'
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось редактировать курс!");
        }
    }
);

export const requestAddMyCoursesItem = createAsyncThunk<CourseAccessItemInterface, string>(
    'courses/requestAddMyCoursesItem',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<CourseAccessItemInterface>(PROJECT_URL + '/my-courses/' + id + '/request', null, {
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

export const enrollStudent = createAsyncThunk<CourseAccessItemInterface, string>(
    'courses/enrollStudent',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<CourseAccessItemInterface>(PROJECT_URL + '/requests/' + id + '/enroll', null, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось добавить ученика на курс!");
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

            .addCase(updateCourse.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action: PayloadAction<CourseItemInterface>) => {
                state.status = 'succeeded';
                state.course = action.payload;
            })
            .addCase(updateCourse.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(requestAddMyCoursesItem.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(requestAddMyCoursesItem.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(requestAddMyCoursesItem.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(enrollStudent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(enrollStudent.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(enrollStudent.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(postCourse.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postCourse.fulfilled, (state, action: PayloadAction<CourseItemInterface>) => {
                state.status = 'succeeded';
                state.course = action.payload;
            })
            .addCase(postCourse.rejected, (state, action: PayloadAction<unknown>) => {
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