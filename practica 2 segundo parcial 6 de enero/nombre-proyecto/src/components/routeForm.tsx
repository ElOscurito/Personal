import type { FormEvent } from 'react';
import { useState } from 'react';
import type { Linea } from '../types/routes';

interface Props {
  onSubmit: (linea: Omit<Linea, 'id_linea' | 'fecha_creacion'>) => void;
  loading?: boolean;
}

export const RouteForm = ({ onSubmit, loading }: Props) => {
  const [nombreLinea, setNombreLinea] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [horario, setHorario] = useState('');
  const [frecuencia, setFrecuencia] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre_linea: nombreLinea, origen, destino, horario, frecuencia });
    setNombreLinea('');
    setOrigen('');
    setDestino('');
    setHorario('');
    setFrecuencia('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombreLinea}
        onChange={e => setNombreLinea(e.target.value)}
        placeholder="Nombre de la línea"
        required
        disabled={loading}
      />
      <input
        value={origen}
        onChange={e => setOrigen(e.target.value)}
        placeholder="Origen"
        required
        disabled={loading}
      />
      <input
        value={destino}
        onChange={e => setDestino(e.target.value)}
        placeholder="Destino"
        required
        disabled={loading}
      />
      <input
        value={horario}
        onChange={e => setHorario(e.target.value)}
        placeholder="Horario"
        required
        disabled={loading}
      />
      <input
        value={frecuencia}
        onChange={e => setFrecuencia(e.target.value)}
        placeholder="Frecuencia"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Agregar línea'}
      </button>
    </form>
  );
};
