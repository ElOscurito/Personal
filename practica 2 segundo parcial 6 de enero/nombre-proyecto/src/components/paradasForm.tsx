import type { FormEvent } from 'react';
import { useState } from 'react';
import type { Parada } from '../types/stops';

interface Props {
  onSubmit: (parada: Omit<Parada, 'id_parada' | 'created_at'>) => void;
  loading?: boolean;
}

export const ParadaForm = ({ onSubmit, loading }: Props) => {
  const [direccion, setDireccion] = useState('');
  const [ordenParada, setOrdenParada] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ direccion, orden_parada: parseInt(ordenParada) });
    setDireccion('');
    setOrdenParada('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        placeholder="Dirección"
        required
        disabled={loading}
      />
      <input
        type="number"
        value={ordenParada}
        onChange={e => setOrdenParada(e.target.value)}
        placeholder="Orden de parada"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Agregar parada'}
      </button>
    </form>
  );
};