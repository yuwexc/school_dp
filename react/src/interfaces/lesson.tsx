import { Done } from "./done"

export interface LessonInterface {
    id_lesson?: string | null,
    lesson_number?: number | null,
    lesson_name: string | null,
    lesson_description: string | null,
    lesson_words: string | null,
    lesson_body: string | null,
    word_amount?: number | null,
    course_id?: number | null,
    lesson_status?: number | null,
    mark?: number | null,
    created_at?: Date | null,
    updated_at?: Date | null,
    done?: Done,
    unchecked_list?: Done[]
}

export const MarkColors = new Map<number, string>([
    [5, '#20bf6b'],
    [4, '#70c656'],
    [3, '#f16b4d'],
    [2, '#eb3b5a']
])

export interface Word {
    id: number
    english: string
    transcription: string
    russian: string
}

export interface Sentence {
    id: number,
    english: string,
    russian: string,
    score: number
    answer?: string
    student_score?: number
}

export interface Columns {
    id: number
}

export interface Rows {
    id: number
}

export interface TableElements {
    title: string,
    cells: string[]
}

export interface TableInterface extends TheoryBodyItem {
    id: number,
    type: 'TABLE',
    elements: TableElements[]
}

export interface LessonText extends TheoryBodyItem {
    id: number,
    type: 'TEXT',
    text: string
}

export interface Exercise extends TheoryBodyItem {
    id: number,
    type: 'TRANSLATION_EXERCISE',
    name: string,
    description: string
    tasks: Sentence[]
}

export interface Theory extends TheoryBodyItem {
    id: number,
    type: 'THEORY',
    name: string,
    body: TheoryBodyItem[]
}

export interface TheoryBodyItem {
    type: TheoryItemType;
}

type TheoryItemType = 'TEXT' | 'TABLE' | 'THEORY' | 'TRANSLATION_EXERCISE';