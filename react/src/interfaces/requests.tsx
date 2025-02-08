export const PROJECT_URL: string = "https://dp-chernaev.xn--80ahdri7a.site/api";

export interface User {
    first_name: string | null,
    last_name: string | null,
    middle_name: string | null,
    phone: string | null,
    email: string | null,
    photo: string | null,
    level_id: number | null,
    password?: string | null,
    api_token?: string | null,
    check_email: boolean | null,
    created_at: Date | null
}

export interface Login {
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

export interface State {
    user: UserResponse,
    achievements: AchievementResponse
}

export interface AchievementItemInterface {
    background: string | null,
    image: string | null,
    title: number | null,
    subtitle: number | null,
    additional: string | null,
}