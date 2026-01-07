import {API_config, getHeaders} from '../config/connection';

export function get<T>(tabla: string): Promise<T[]> {
    const ENDPOINT = `${API_config.URL_SUPABASE}/${tabla}`;
    return fetch(ENDPOINT,
        {method: 'GET', 
        headers: getHeaders()})
        .then(async res => {
            const text = await res.text();
            if(!res.ok){
                console.error(`HTTP ${res.status}: ${text}`);
                throw new Error ('Error al obtener los datos de la tabla '+ tabla);
            }
            if (!text) return [];
            return JSON.parse(text);
        })
    .catch(error => {
        console.error("Fetch error:", error);
        throw error; 
    });
}


export function create<T>(tabla: string, data: Partial<T>): Promise<T> {
    const ENDPOINT = `${API_config.URL_SUPABASE}/${tabla}`;
    return fetch(ENDPOINT, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })
    .then(async res => {
        const text = await res.text();
        if (!res.ok) {
            console.error(`HTTP ${res.status}: ${text}`);
            throw new Error(`Error al insertar en la tabla ${tabla}: ${res.status} ${res.statusText}`);
        }
        if (!text) return {} as T;
        return JSON.parse(text);
    })
    .catch(error => {
        console.error("Insert error:", error);
        throw error;
    });
}