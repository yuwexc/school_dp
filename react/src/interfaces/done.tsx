import { User } from "./user";

export interface Done {
    id_done?: number,
    lesson_id?: string,
    student?: User,
    st_answer: string,
    feedback?: string,
    mark?: number,
    time_start: string,
    time_end: string,
    created_at?: Date,
    updated_at?: Date | null
}

export interface Feedback {
    id: number,
    english: string;
    student_score: string;
}