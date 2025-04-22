import { CoursesState } from "../features/courseSlice";
import { AchievementItemInterface } from "./achievement";
import { LessonInterface } from "./lesson";
import { User } from "./user";

export const PROJECT_URL: string = "https://dp-chernaev.xn--80ahdri7a.site/api";

export interface LoginInterface {
    email: string | null,
    password: string | null,
}

interface UserResponse {
    user: User,
    token: string | null,
    error: string | null,
    status: string | null
}

interface AchievementResponse {
    achievements: AchievementItemInterface,
    error: string | null,
    status: string | null
}

interface LessonResponse {
    lesson: LessonInterface,
    error: string | null,
    status: string | null
}

export interface State {
    user: UserResponse,
    achievements: AchievementResponse,
    courses: CoursesState,
    lesson: LessonResponse
}