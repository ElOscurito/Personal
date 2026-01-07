import type { Linea } from '../types/routes';

interface Props {
  linea: Linea;
}

export const RouteCard = ({ linea }: Props) => {
  return (
    <div className="card">
      <p><strong>{linea.nombre_linea}</strong></p>
      <p>Origen: {linea.origen}</p>
      <p>Destino: {linea.destino}</p>
      <p>Horario: {linea.horario}</p>
      <p>Frecuencia: {linea.frecuencia}</p>
    </div>
  );
};
