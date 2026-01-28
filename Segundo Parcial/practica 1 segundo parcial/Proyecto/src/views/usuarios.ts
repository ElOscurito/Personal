import { get, create } from '../API/supa.ts';
import { usercard } from '../componentes/cards.ts';
import type { IUsuario } from '../interface/index.ts';

export async function renderUsuarios(): Promise<string> {
  try {
    const usuarios = await get<IUsuario>('usuarios');
    
    const usuariosHTML = usuarios && usuarios.length > 0
      ? usuarios.map((user: IUsuario) => usercard(user)).join('')
      : '<p>No hay usuarios disponibles</p>';

    return `
      <div>
        <h2>Usuarios</h2>
        
        <section style="margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Crear Nuevo Usuario</h3>
          <form id="form-usuarios" style="display: flex; flex-direction: column; gap: 10px;">
            <input type="text" id="nombre" placeholder="Nombre" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <input type="email" id="correo" placeholder="Correo" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <input type="password" id="contrasena" placeholder="Contraseña" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <select id="rol" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
              <option value="">Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
              <option value="conductor">Conductor</option>
            </select>
            <button type="submit" style="padding: 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Crear Usuario</button>
            <div id="form-mensaje" style="display: none; padding: 10px; border-radius: 4px; margin-top: 10px;"></div>
          </form>
        </section>

        <section>
          <h3>Lista de Usuarios</h3>
          <div class="usuarios-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
            ${usuariosHTML}
          </div>
        </section>
      </div>
    `;
  } catch (error) {
    return `<p>Error cargando usuarios: ${String(error)}</p>`;
  }
}

export async function attachUsuariosFormListener() {
  const form = document.querySelector<HTMLFormElement>('#form-usuarios');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = (document.querySelector<HTMLInputElement>('#nombre')?.value || '').trim();
    const correo = (document.querySelector<HTMLInputElement>('#correo')?.value || '').trim();
    const contrasena = (document.querySelector<HTMLInputElement>('#contrasena')?.value || '').trim();
    const rol = (document.querySelector<HTMLSelectElement>('#rol')?.value || '').trim();

    if (!nombre || !correo || !contrasena || !rol) {
      mostrarMensaje('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      // No incluir id_usuario, Supabase lo genera automáticamente
      const nuevoUsuario = {
        nombre,
        correo,
        contrasena,
        rol
      };

      console.log('Enviando usuario:', nuevoUsuario);
      await create('usuarios', nuevoUsuario);
      mostrarMensaje('Usuario creado exitosamente', 'success');
      
      // Limpiar formulario
      form.reset();
      
      // Recargar la vista después de 1 segundo
      setTimeout(() => {
        window.location.hash = '#/usuarios';
      }, 1000);
    } catch (error) {
      console.error('Error detallado:', error);
      mostrarMensaje(`Error: ${String(error)}`, 'error');
    }
  });

  function mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    const div = document.querySelector<HTMLDivElement>('#form-mensaje');
    if (div) {
      div.style.display = 'block';
      div.style.backgroundColor = tipo === 'success' ? '#d4edda' : '#f8d7da';
      div.style.color = tipo === 'success' ? '#155724' : '#721c24';
      div.textContent = mensaje;
    }
  }
}
