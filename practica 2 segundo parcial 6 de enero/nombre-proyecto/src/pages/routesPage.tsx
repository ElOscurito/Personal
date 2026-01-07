import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Linea } from '../types/routes';
import { get, create } from '../services/supaservice';
import { RouteCard } from '../components/routeCard';
import { RouteForm } from '../components/routeForm';

export const RoutesPage = () => {
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLineas();
  }, []);

  const loadLineas = async () => {
    try {
      setLoading(true);
      const data = await get<Linea>("lineas");
      setLineas(data);
    } catch (err) {
      setError('Error al cargar líneas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (linea: Omit<Linea, 'id_linea' | 'fecha_creacion'>) => {
    try {
      setSaving(true);
      const newLinea = await create<Linea>("lineas", linea);
      setLineas(prev => [newLinea, ...prev]);
    } catch (err) {
      setError('Error al agregar línea');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <Link to="/">← Volver al inicio</Link>
      <h1>Gestión de Líneas</h1>

      <RouteForm onSubmit={handleAdd} loading={saving} />

      {error && <p className="error">{error}</p>}
      {loading && <p>Cargando líneas...</p>}
      {!loading && lineas.length === 0 && <p>No hay líneas</p>}

      <div className="grid">
        {lineas.map(l => <RouteCard key={l.id_linea} linea={l} />)}
      </div>
    </div>
  );
};