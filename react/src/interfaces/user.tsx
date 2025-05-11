import { Level } from "./level";
import { Role } from "./role";

export interface User {
    id_user: string | null,
    first_name: string | null,
    last_name: string | null,
    middle_name: string | null,
    phone: string | null,
    email: string | null,
    photo: string | null,
    level?: Level | null,
    role?: Role | null,
    score: number | null,
    password?: string | null,
    api_token?: string | null,
    created_at: Date | null
}