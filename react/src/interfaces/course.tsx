import { Category } from "./category";
import CourseAccessItemInterface from "./course_access";
import { LessonInterface } from "./lesson";
import { Level } from "./level";
import { User } from "./user";

export interface CourseItemInterface {
    id_course: string,
    course_name: string,
    course_description: string,
    level: Level,
    category: Category | null,
    image: string | null,
    author: User,
    access: CourseAccessItemInterface | null,
    lessons: LessonInterface[] | null,
    top_students?: User[],
    students?: (User & { progress?: number })[],
    requests?: (CourseAccessItemInterface & { student: { first_name: string, last_name: string, photo: string } })[],
    progress: number,
    created_at: Date,
    updated_at: Date | null
}