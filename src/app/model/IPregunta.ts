import { IOpcion } from "./IOpcion";

export interface IPregunta{
  id:number;
  tipo: number;
  descripcion: string;
  urgente: number;
  observacion: number;
  opciones: IOpcion[];
  respuesta: any;
  respuestaUrgente:number;
  respuestaComentario:string;
}