import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PROJECT_URL } from "../interfaces/requests";
import { LessonInterface } from "../interfaces/lesson";
import { Done, Feedback } from "../interfaces/done";

interface LessonState {
    lesson: LessonInterface,
    status: 'loading' | 'succeeded' | 'failed' | null;
    error: string | null;
}

const lesson: LessonInterface = {
    id_lesson: null,
    lesson_number: null,
    lesson_name: null,
    lesson_description: null,
    lesson_words: null,
    lesson_body: null,
    word_amount: null,
    course_id: null,
    lesson_status: null,
    mark: null,
    created_at: null,
    updated_at: null
}

const initialState: LessonState = {
    lesson,
    status: null,
    error: null,
};

export const fetchLesson = createAsyncThunk<LessonInterface, string>(
    'lesson/fetchLesson',
    async (id, { rejectWithValue }) => {
        try {

            const { data } = await axios.get<LessonInterface>(PROJECT_URL + '/lessons/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось загрузить урок!");
        }
    }
);

export const postLesson = createAsyncThunk<LessonInterface, { course: string, lesson: LessonInterface }>(
    'lesson/postLesson',
    async ({ course, lesson }, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(PROJECT_URL + '/courses/' + course + '/lessons', lesson, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось создать урок!");
        }
    }
)

export const completeLesson = createAsyncThunk<null, Done>(
    'lesson/completeLesson',
    async (done, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(PROJECT_URL + '/lessons/' + done.lesson_id + '/done', done, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось пройти урок!");
        }
    }
)

export const getStudentAnswer = createAsyncThunk<LessonInterface, { user: string, id: string }>(
    'lesson/getStudentAnswer',
    async ({ user, id }, { rejectWithValue }) => {
        try {

            const { data } = await axios.get(PROJECT_URL + '/user/' + user + '/lessons/' + id + '/done', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось получить ответ студента!");
        }
    }
)

export const postFeedback = createAsyncThunk<LessonInterface, { user: string, id: string, feedback: Feedback[][], mark: number, score: number }>(
    'lesson/postFeedback',
    async ({ user, id, feedback, mark, score }, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(PROJECT_URL + '/user/' + user + '/lessons/' + id + '/done', { feedback, mark, score }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
                }
            });
            return data;

        } catch {
            return rejectWithValue("Не удалось отправить отзыв о работе студента!");
        }
    }
)

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //get

            .addCase(fetchLesson.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLesson.fulfilled, (state, action: PayloadAction<LessonInterface>) => {
                state.status = 'succeeded';
                state.lesson = action.payload;
            })
            .addCase(fetchLesson.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(getStudentAnswer.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getStudentAnswer.fulfilled, (state, action: PayloadAction<LessonInterface>) => {
                state.status = 'succeeded';
                state.lesson = action.payload;
            })
            .addCase(getStudentAnswer.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            //post

            .addCase(postLesson.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postLesson.fulfilled, (state, action: PayloadAction<LessonInterface>) => {
                state.status = 'succeeded';
                state.lesson = action.payload;
            })
            .addCase(postLesson.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })

            .addCase(postFeedback.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postFeedback.fulfilled, (state, action: PayloadAction<LessonInterface>) => {
                state.status = 'succeeded';
                state.lesson = action.payload;
            })
            .addCase(postFeedback.rejected, (state, action: PayloadAction<unknown>) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.status = 'failed';
                }
            })
    },
});

export const selectLesson = (state: { lesson: LessonState }) => state.lesson.lesson;
export const selectLessonStatus = (state: { lesson: LessonState }) => state.lesson.status;
export const selectLessonError = (state: { lesson: LessonState }) => state.lesson.error;

export default lessonSlice.reducer;