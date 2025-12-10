import { get, create } from '../API/supa.ts';
import { horariocard } from '../componentes/cards.ts';
import type { IHorario } from '../interface/index.ts';

export async function renderHorarios(): Promise<string> {
  try {
    const horarios = await get<IHorario>('horarios');
    
    const horariosHTML = horarios && horarios.length > 0
      ? horarios.map((horario: IHorario) => horariocard(horario)).join('')
      : '<p>No hay horarios disponibles</p>';

    return `
      <div>
        <h2>Horarios</h2>
        
        <section style="margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Crear Nuevo Horario</h3>
          <form id="form-horarios" style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span>Hora Inicio:</span>
              <input type="time" id="inicio" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </label>
            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span>Hora Fin:</span>
              <input type="time" id="fin" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </label>
            <label style="display: flex; flex-direction: column; gap: 5px;">
              <span>Frecuencia (minutos):</span>
              <input type="number" id="frecuencia" placeholder="Ej: 15" min="1" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </label>
            <button type="submit" style="padding: 10px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Crear Horario</button>
            <div id="form-mensaje" style="display: none; padding: 10px; border-radius: 4px; margin-top: 10px;"></div>
          </form>
        </section>

        <section>
          <h3>Lista de Horarios</h3>
          <div class="horarios-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
            ${horariosHTML}
          </div>
        </section>
      </div>
    `;
  } catch (error) {
    return `<p>Error cargando horarios: ${String(error)}</p>`;
  }
}

export async function attachHorariosFormListener() {
  const form = document.querySelector<HTMLFormElement>('#form-horarios');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inicio = (document.querySelector<HTMLInputElement>('#inicio')?.value || '').trim();
    const fin = (document.querySelector<HTMLInputElement>('#fin')?.value || '').trim();
    const frecuencia = parseInt(document.querySelector<HTMLInputElement>('#frecuencia')?.value || '0');

    if (!inicio || !fin || !frecuencia) {
      mostrarMensaje('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      // No incluir id, Supabase lo genera automáticamente
      const nuevoHorario = {
        inicio,
        fin,
        frecuencia
      };

      await create('horarios', nuevoHorario);
      mostrarMensaje('Horario creado exitosamente', 'success');
      
      // Limpiar formulario
      form.reset();
      
      // Recargar la vista después de 1 segundo
      setTimeout(() => {
        window.location.hash = '#/horarios';
      }, 1000);
    } catch (error) {
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
