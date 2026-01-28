import {URL_SUPABASE,API_KEY} from '../config/supabase.ts';
export function get<T>(tabla:String): Promise <T[]> {
    const url = `${URL_SUPABASE}/rest/v1/${tabla}`;
    return fetch(url,
        {method: 'GET', 
        headers: {'Content-Type': 'application/json','apiKey': `${API_KEY}`, 'Authorization': `Bearer ${API_KEY}`}})
        .then(res => {
            if(!res.ok){
                throw new Error ('Error al obtener los datos de la tabla '+ tabla);
            }
            return res.json();
        })
    .catch(error => {
        console.error("Fetch error:", error);
        throw error; 
    });
}
export function create<T>(tabla:String, data:T): Promise <T> {
    const url = `${URL_SUPABASE}/rest/v1/${tabla}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation', 
            'apiKey': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error al insertar en la tabla ${tabla}: ${res.status} ${res.statusText}`);
        }
        return res.json();
    })
    .catch(error => {
        console.error("Insert error:", error);
        throw error;
    });
}