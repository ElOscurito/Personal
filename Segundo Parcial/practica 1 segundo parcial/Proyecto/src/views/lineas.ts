import { get, create } from '../API/supa.ts';
import { linecard } from '../componentes/cards.ts';
import type { ILinea } from '../interface/index.ts';

export async function renderLineas(): Promise<string> {
  try {
    const lineas = await get<ILinea>('lineas');
    
    const lineasHTML = lineas && lineas.length > 0
      ? lineas.map((linea: ILinea) => linecard(linea)).join('')
      : '<p>No hay líneas disponibles</p>';

    return `
      <div>
        <h2>Líneas</h2>
        
        <section style="margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Crear Nueva Línea</h3>
          <form id="form-lineas" style="display: flex; flex-direction: column; gap: 10px;">
            <input type="number" id="numero" placeholder="Número de línea" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <textarea id="paradas" placeholder="Paradas (separadas por comas)" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-height: 80px;"></textarea>
            <textarea id="ruta" placeholder="Descripción de la ruta" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-height: 80px;"></textarea>
            <input type="text" id="id_horarios" placeholder="ID del Horario" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="estado" checked style="cursor: pointer;">
              <span>Estado Activo</span>
            </label>
            <button type="submit" style="padding: 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Crear Línea</button>
            <div id="form-mensaje" style="display: none; padding: 10px; border-radius: 4px; margin-top: 10px;"></div>
          </form>
        </section>

        <section>
          <h3>Lista de Líneas</h3>
          <div class="lineas-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
            ${lineasHTML}
          </div>
        </section>
      </div>
    `;
  } catch (error) {
    return `<p>Error cargando líneas: ${String(error)}</p>`;
  }
}

export async function attachLineasFormListener() {
  const form = document.querySelector<HTMLFormElement>('#form-lineas');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const numero = parseInt(document.querySelector<HTMLInputElement>('#numero')?.value || '0');
    const paradas = (document.querySelector<HTMLTextAreaElement>('#paradas')?.value || '').trim();
    const ruta = (document.querySelector<HTMLTextAreaElement>('#ruta')?.value || '').trim();
    const id_horarios = (document.querySelector<HTMLInputElement>('#id_horarios')?.value || '').trim();
    const estado = (document.querySelector<HTMLInputElement>('#estado')?.checked || false);

    if (!numero || !paradas || !ruta || !id_horarios) {
      mostrarMensaje('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      // No incluir id, Supabase lo genera automáticamente
      const nuevaLinea = {
        numero,
        paradas,
        ruta,
        id_horarios,
        estado
      };

      console.log('Enviando línea:', nuevaLinea);
      await create('lineas', nuevaLinea);
      mostrarMensaje('Línea creada exitosamente', 'success');
      
      // Limpiar formulario
      form.reset();
      document.querySelector<HTMLInputElement>('#estado')!.checked = true;
      
      // Recargar la vista después de 1 segundo
      setTimeout(() => {
        window.location.hash = '#/lineas';
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
