import { ISeccion } from "./ISeccion";

export interface ISurvey{

    titulo: string;
    fechainicio: string;
    fechaCorte: string;
    instrucciones: string;
    secciones: ISeccion[];
    msgFinal: string;
    estado: number;
    
}