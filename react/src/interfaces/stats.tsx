import { Activity } from "./activity";
import { User } from "./user";

export interface Stats {
    users_count: number;
    users_trend: number;
    teachers_count: number;
    teachers_trend: number;
    categories_count: number;
    categories_trend: number;
    activity_count: number;
    activity_trend: number;
    recent_users: User[],
    recent_activities: Activity[]
}