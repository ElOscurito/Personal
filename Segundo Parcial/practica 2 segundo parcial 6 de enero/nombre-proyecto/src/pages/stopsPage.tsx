import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Parada } from '../types/stops';
import { get, create } from '../services/supaservice';
import { ParadaCard } from '../components/paradasCard';
import { ParadaForm } from '../components/paradasForm';
export const StopsPage = () => {
 const [paradas, setParadas] = useState<Parada[]>([]);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [error, setError] = useState<string | null>(null);
 useEffect(() => {
 loadProducts();
 }, []);
 const loadProducts = async () => {
 try {
setLoading(true);
 const data = await get<Parada>("paradas");
 setParadas(data);
 } catch (err) {
 setError('Error al cargar paradas');
 console.error(err);
 } finally {
 setLoading(false);
 }
 };
 const handleAdd = async (parada: Omit<Parada, 'id_parada' | 'created_at'>) => {
 try {
 setSaving(true);
 const newParada = await create<Parada>("paradas", parada);
 setParadas(prev => [newParada, ...prev]);
 } catch (err) {
 setError('Error al agregar parada');
 console.error(err);
 } finally {
 setSaving(false);
 }
 };
 return (
 <div className="page">
 <Link to="/">← Volver al inicio</Link>
 <h1>Gestión de Paradas</h1>

 <ParadaForm onSubmit={handleAdd} loading={saving} />

 {error && <p className="error">{error}</p>}
 {loading && <p>Cargando paradas...</p>}
 {!loading && paradas.length === 0 && <p>No hay paradas</p>}
 <div className="grid">
 {paradas.map(p => <ParadaCard key={p.id_parada} parada={p} />)}
 </div>
 </div>
 );
};