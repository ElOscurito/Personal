import type { Usuario } from '../types/users'; 
 
interface Props { 
  usuario: Usuario; 
} 
 
export const UserCard = ({ usuario }: Props) => { 
  return ( 
    <div className="card"> 
        <p>{usuario.nombre}</p> 
        <p>{usuario.email}</p>
        <p>{usuario.rol}</p>  
    </div> 
  ); 
};
