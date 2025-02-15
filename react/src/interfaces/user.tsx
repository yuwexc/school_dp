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