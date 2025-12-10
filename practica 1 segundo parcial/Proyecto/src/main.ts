import './style.css'
import { setupCounter } from './counter.ts'
import { initRouter } from './router.ts'
import { renderUsuarios, attachUsuariosFormListener } from './views/usuarios.ts'
import { renderLineas, attachLineasFormListener } from './views/lineas.ts'
import { renderHorarios, attachHorariosFormListener } from './views/horarios.ts'

async function init() {
  
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <header>
        <nav style="margin: 20px 0; padding: 10px; border-bottom: 1px solid #ccc;">
        <a href="#/" style="margin-right: 15px; text-decoration: none; color: #0066cc;">Home</a>
        <a href="#/usuarios" style="margin-right: 15px; text-decoration: none; color: #0066cc;">Usuarios</a>
        <a href="#/lineas" style="margin-right: 15px; text-decoration: none; color: #0066cc;">Líneas</a>
        <a href="#/horarios" style="margin-right: 15px; text-decoration: none; color: #0066cc;">Horarios</a>
      </nav>

      </header>
      
      <div class="card">
        <button id="counter" type="button"></button>
      </div>

      <main id="view" style="padding: 20px;">
      </main>

    </div>
  `

  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

  // Inicializar el router
  initRouter('#view', {
    '': async () => `
      <section>
        <h2>Home</h2>
        <p>Bienvenido a la aplicación. Usa los enlaces de navegación arriba para ver usuarios, líneas y horarios.</p>
      </section>
    `,
    'usuarios': {
      render: renderUsuarios,
      onRender: attachUsuariosFormListener
    },
    'lineas': {
      render: renderLineas,
      onRender: attachLineasFormListener
    },
    'horarios': {
      render: renderHorarios,
      onRender: attachHorariosFormListener
    }
  })
}

init().catch(error => console.error("Error initializing app:", error))
