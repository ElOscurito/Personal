import {get} from '../API/supa.ts';
import {usercard,horariocard,linecard} from '../componentes/cards.ts';
import type {IHorario, ILinea, IUsuario} from '../interface/index.ts';
async function renderUsuarios(){
    const usuarios = await get<IUsuario>('usuarios');
    if(usuarios && usuarios.length > 0){
        const htmlUsuarios = usuarios.map((user: IUsuario) =>
            usercard(user)
    ).join('');
        return htmlUsuarios;
    }
    return ''
}
async function renderHorarios(){
    const horarios = await get<IHorario>('horarios');
    if(horarios && horarios.length > 0){
        const htmlHorarios = horarios.map((horario: IHorario) =>
            horariocard(horario)
    ).join('');
        return htmlHorarios;
    }
    return ''
}

async function renderLineas(){
    const lineas = await get<ILinea>('lineas');
    if(lineas && lineas.length > 0){
        const htmlLineas = lineas.map((linea: ILinea) =>
            linecard(linea)
    ).join('');
        return htmlLineas;
    }
    return ''
}
export {renderUsuarios, renderHorarios, renderLineas};