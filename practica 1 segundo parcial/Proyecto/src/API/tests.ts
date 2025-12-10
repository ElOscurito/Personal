import { get } from '../API/supa.ts'; // Asegúrate de que esta ruta sea correcta
import type { IUsuario, ILinea } from '../interface/index.ts';

async function testGet() {
    console.log("--- Probando la función get<T> ---");

    try {
        // 1. Obtener la tabla de usuarios
        const usuarios: IUsuario[] = await get<IUsuario>('usuarios');
        console.log(`✅ Éxito: Se obtuvieron ${usuarios.length} usuarios.`);
        console.log("Primer usuario:", usuarios[0]);

        // 2. Obtener otra tabla (ej. ILinea) para probar la genericidad
        const lineas: ILinea[] = await get<ILinea>('Linea');
        console.log(`✅ Éxito: Se obtuvieron ${lineas.length} líneas.`);
        console.log("Primera línea:", lineas[0]);

        // 3. Simular un error (usando una tabla que no existe)
        await get('tabla_falsa_404'); 
        
    } catch (error) {
        console.log("⚠️ Error capturado (esperado si la tabla no existe o la URL es incorrecta):");
        console.error(error);
    }
}

import { renderUsuarios } from '../views/billboard.ts'; // O donde esté la función

async function testRender() {
    console.log("--- Probando renderUsuarios() ---");

    const htmlOutput = await renderUsuarios();

    if (htmlOutput) {
        console.log("✅ Renderizado exitoso.");
        console.log("Contenido HTML generado (primeras 500 letras):");
        // Muestra el principio de la cadena HTML
        console.log(htmlOutput.substring(0, 500) + '...');
        
        // Puedes verificar si contiene alguna etiqueta esperada, como <div>
        if (htmlOutput.includes('<div>')) { 
             console.log("✅ El HTML contiene etiquetas esperadas (ej. <div>)");
        }
    } else {
        console.log("⚠️ Renderizado completado, pero no se generó HTML (puede que no haya datos).");
    }
}

testRender();

testGet();