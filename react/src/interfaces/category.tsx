export interface Category {
    id_category: number | null,
    image: string | null,
    category_name: string,
    created_at: Date | null,
    updated_at: Date | null,
    count?: number
}