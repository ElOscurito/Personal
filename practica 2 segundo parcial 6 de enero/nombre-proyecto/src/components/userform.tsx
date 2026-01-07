import type { FormEvent } from 'react'; 
import { useState } from 'react'; 
import type { Usuario } from '../types/users'; 
 
interface Props { 
  onSubmit: (usuario: Omit<Usuario, 'id'>) => void; 
  loading?: boolean; 
} 
 
export const UserForm = ({ onSubmit, loading }: Props) => { 
  const [nombre, setName] = useState(''); 
  const [email, setEmail] = useState('');                          
  const [rol, setRol] = useState(''); 
  const [contrasena,setContrasena] = useState('')
 
  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault(); 
    onSubmit({ nombre, email, rol,contrasena }); 
    setName(''); setEmail(''); setRol('');setContrasena('');
  }; 
 
  return ( 
    <form onSubmit={handleSubmit}> 
      <input value={nombre} onChange={e => setName(e.target.value)} 
             placeholder="Nombre" required disabled={loading} /> 
      <input value={email} 
             onChange={e => setEmail(e.target.value)} 
             placeholder="Email" required disabled={loading} /> 
      <input value={contrasena} 
             onChange={e => setContrasena(e.target.value)} 
             placeholder="Contrasena" required disabled={loading} /> 
      <input value={rol} 
             onChange={e => setRol(e.target.value)} 
             placeholder="Rol" required disabled={loading} /> 
      <button type="submit" disabled={loading}> 
        {loading ? 'Guardando...' : 'Agregar usuario'} 
      </button> 
    </form> 
  ); 
};