export interface Movie {
 id: string;
 title: string;
 image: string;
 description: string;
 category_id: string;
 created_at?: string;
}
// MovieWithDetails extiende Movie con información adicional
export interface MovieWithDetails extends Movie {
 category?: {
 id: string;
 name: string;
 };
 actors?: Array<{
 id: string;
 name: string;
 }>;
}