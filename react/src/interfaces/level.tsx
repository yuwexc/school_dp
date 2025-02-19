export interface Level {
    id_level: number
    level_code: string
    level_name: string
    level_title: string
    created_at: string
    updated_at: string | null
}

export const LevelColors = new Map<string, string>([
    ['A1', '#20bf6b'],
    ['A2', '#70c656'],
    ['B1', '#c9ce3e'],
    ['B2', '#f9a83c'],
    ['C1', '#f16b4d'],
    ['C2', '#eb3b5a']
])