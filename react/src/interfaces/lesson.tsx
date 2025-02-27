export interface Lesson {
    id_lesson: number,
    lesson_number: number,
    lesson_name: string,
    lesson_description: string,
    lesson_body: JSON,
    word_amount: number,
    course_id: number,
    lesson_status: number,
    mark: number,
    created_at: Date,
    updated_at: Date | null
}

export const MarkColors = new Map<number, string>([
    [5, '#20bf6b'],
    [4, '#70c656'],
    [3, '#f16b4d'],
    [2, '#eb3b5a']
])