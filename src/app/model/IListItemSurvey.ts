import { IItemSurvey } from "./IItemSurvey";

export interface IListItemSurvey{
    pendientes:IItemSurvey[],
    completos:IItemSurvey[],
    enProceso:IItemSurvey[],
    vencidos:IItemSurvey[]
}