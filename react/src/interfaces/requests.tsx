import { AchievementItemInterface } from "./achievement";
import { CourseItemInterface } from "./course";
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

interface CourseResponse {
    myCourses: CourseItemInterface[],
    error: string | null,
    status: string | null
}

export interface State {
    user: UserResponse,
    achievements: AchievementResponse,
    courses: CourseResponse
}