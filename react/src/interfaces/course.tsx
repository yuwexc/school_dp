import CourseAccessItemInterface from "./course_access";
import { Lesson } from "./lesson";
import { Level } from "./level";
import { User } from "./user";

export interface CourseItemInterface {
    id_course: number,
    course_name: string,
    course_description: string,
    level: Level,
    category: string | null,
    image: string | null,
    author: User,
    access: CourseAccessItemInterface | null,
    lessons: Lesson[] | null,
    progress: number,
    created_at: Date,
    updated_at: Date | null
}