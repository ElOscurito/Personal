import type { Parada } from '../types/stops';

interface Props {
  parada: Parada;
}

export const ParadaCard = ({ parada }: Props) => {
  return (
    <div className="card">
      <p><strong>{parada.direccion}</strong></p>
      <p>Orden: {parada.orden_parada}</p>
    </div>
  );
};

