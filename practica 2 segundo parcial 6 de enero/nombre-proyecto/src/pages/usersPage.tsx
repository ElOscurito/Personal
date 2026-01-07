import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Usuario } from '../types/users';
import { get, create } from '../services/supaservice';
import { UserCard } from '../components/usercard';
import { UserForm } from '../components/userform';
export const UsersPage = () => {
 const [products, setProducts] = useState<Usuario[]>([]);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [error, setError] = useState<string | null>(null);
 useEffect(() => {
 loadProducts();
 }, []);
 const loadProducts = async () => {
 try {
setLoading(true);
 const data = await get<Usuario>("usuarios");
 setProducts(data);
 } catch (err) {
 setError('Error al cargar usuarios');
 console.error(err);
 } finally {
 setLoading(false);
 }
 };
 const handleAdd = async (usuario: Omit<Usuario, 'id'>) => {
 try {
 setSaving(true);
 const newUsuario = await create<Usuario>("usuarios", usuario);
 setProducts(prev => [newUsuario, ...prev]);
 } catch (err) {
 setError('Error al agregar usuario');
 console.error(err);
 } finally {
 setSaving(false);
 }
 };
 return (
 <div className="page">
 <Link to="/">← Volver al inicio</Link>
 <h1>Gestión de Usuarios</h1>

 <UserForm onSubmit={handleAdd} loading={saving} />

 {error && <p className="error">{error}</p>}
 {loading && <p>Cargando usuarios...</p>}
 {!loading && products.length === 0 && <p>No hay usuarios</p>}

 <div className="grid">
 {products.map(p => <UserCard key={p.id} usuario={p} />)}
 </div>
 </div>
 );
};