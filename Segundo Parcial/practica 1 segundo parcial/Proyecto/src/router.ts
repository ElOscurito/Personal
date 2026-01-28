export type RouteHandler = () => Promise<string> | string;

export interface Routes {
  [key: string]: RouteHandler | { render: RouteHandler; onRender?: () => Promise<void> | void };
}

export function initRouter(viewSelector: string, routes: Routes) {
  const viewContainer = document.querySelector<HTMLElement>(viewSelector)!;
  
  if (!viewContainer) {
    throw new Error(`Router: No se encontró el elemento ${viewSelector}`);
  }

  async function render() {
    const hash = location.hash.slice(1) || '/'; // Quita el # y usa / como default
    const route = hash.startsWith('/') ? hash.slice(1) : hash; // Quita el primer / si existe
    
    const routeConfig = routes[route] || routes[''];
    
    if (!routeConfig) {
      viewContainer.innerHTML = `
        <div>
          <h2>404 - Página no encontrada</h2>
          <p>La ruta "${route}" no existe.</p>
        </div>
      `;
      return;
    }

    try {
      viewContainer.innerHTML = '<p>Cargando...</p>';
      
      // Determinar si es un handler simple o un objeto con render y onRender
      let handler: RouteHandler;
      let onRender: (() => Promise<void> | void) | undefined;
      
      if (typeof routeConfig === 'function') {
        handler = routeConfig;
      } else {
        handler = routeConfig.render;
        onRender = routeConfig.onRender;
      }
      
      const html = await Promise.resolve(handler());
      viewContainer.innerHTML = html;
      
      // Ejecutar onRender si existe
      if (onRender) {
        await Promise.resolve(onRender());
      }
    } catch (error) {
      viewContainer.innerHTML = `
        <div>
          <h2>Error</h2>
          <p>${String(error)}</p>
        </div>
      `;
      console.error('Router error:', error);
    }
  }

  // Escucha cambios de hash
  window.addEventListener('hashchange', render);
  
  // Render inicial
  render();
}
