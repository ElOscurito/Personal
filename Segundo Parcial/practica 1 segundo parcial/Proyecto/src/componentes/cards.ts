import type {IUsuario, IHorario, ILinea} from '../interface/index.ts';
export function usercard(user: IUsuario): string {
    return `<div> 
    ${user.nombre} 
    ${user.id_usuario}
    <div>`};
export function horariocard(horario: IHorario): string {
    return `<div> ${horario.id} <div>`};
export function linecard(line: ILinea): string {
    return `<div> ${line.numero} <div>`}
