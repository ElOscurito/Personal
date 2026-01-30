export interface Game {
    id: string;
    title: string;
    cover: string;
    description: string;
    year: number;
    platform_id: string;
    created_at?: string;
}

export interface GameWithDetails extends Game {
    platform?: {
        id: string;
        name: string;
    };
    developers?: Array<{
        id: string;
        name: string;
    }>;

}