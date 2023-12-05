import { IPregunta } from "./IPregunta";

export interface ISeccion{
    descripcion: string;
    preguntas: IPregunta[];
    estado: number;
}