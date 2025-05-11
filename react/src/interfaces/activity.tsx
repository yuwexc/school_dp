export interface Activity {
    id: string;
    type: 'login' | 'create' | 'update' | 'delete' | 'other';
    description: string;
    entity_type: string;
    entity_id: string;
    user_id: string;
    user_name: string;
    created_at: string;
    ip_address?: string;
}