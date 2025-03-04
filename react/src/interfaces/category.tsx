export interface Category {
    id_category: number,
    image: string | null,
    category_name: string,
    created_at: Date,
    updated_at: Date | null,
    count?: number
}