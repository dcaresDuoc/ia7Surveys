import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import {IItemSurvey} from '../model/IItemSurvey';
import { IListItemSurvey } from '../model/IListItemSurvey';
import { Observable } from 'rxjs';
import { IResultado } from '../model/IResultado';
import { IUsuario } from '../model/IUsuario';
import { IEncuesta } from '../model/IEncuesta';
import { IAsignacion } from '../model/IAsignacion';
import { ICliente } from '../model/ICliente';


@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  //url:string = 'http://localhost/api/index.php/survey/';
  url:string = 'https://survey.ia7.cl/api/index.php/survey/';
  urlLogin:string = 'https://survey.ia7.cl/api/index.php/user/';
  urlClien:string = 'https://survey.ia7.cl/api/index.php/';

  public GetSurveyListByUser(idUser:number){    
    return this.http.get<IListItemSurvey[]>(this.url + "list?user=" + idUser);
  }

  public GetSurveyById(id:number){
    return this.http.get<IListItemSurvey[]>(this.url + "get?id=" + id + "&usr=" + 1);
  }

  public PostSurvey(idEncuesta: number, idUsuario: number, status: number, survey: any): Observable<HttpResponse<any>> {
    const surveyJson = JSON.stringify(survey);
    console.log(surveyJson);
    return this.http.post<any>(this.url + "save?id=" + idEncuesta + "&usr=" + idUsuario + "&status=" + status, surveyJson, {observe: 'response'});
  }

  public GetStadistica(id:number)
  {
    return this.http.get<IResultado>(this.url + "statics?id=" + id);
  }

  login(usuario: string, pass: string): Observable<HttpResponse<IUsuario>>{
    const body = {
      user: usuario,
      password: pass
    };

    const surveyJson = JSON.stringify(body);
    return this.http.post<any>(this.urlLogin + "login", surveyJson);
  }

  public GetSurveyListByClient(idUser:number){    
    return this.http.get<IEncuesta[]>(this.url + "surveys?id=" + idUser);
  }

  public GetSurveyListByClientAssigment(idUser:number){    
    return this.http.get<IAsignacion[]>(this.url + "assigment?id=" + idUser);
  }

  public PostNewSurvey(survey:any,id:number): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.url + "create?id=" + id , survey, {observe: 'response'});
  }

  public GetClientes(){
    return this.http.get<ICliente[]>(this.urlClien + 'client/list');
  }

  public GetUser(id:number){
    return this.http.get<any[]>(this.urlLogin + "listprofile?id=" + id);
  }
  

  AsignarEncuesta(idususuario: number, idencuestya: number,fechahoratope:string): Observable<HttpResponse<IUsuario>>{
    const body = {
      idUsuario: idususuario,
      idEncuesta: idencuestya,
      fechaHoraTope:fechahoratope
    };

    const assignSurvey = JSON.stringify(body);
    return this.http.post<any>(this.url + "assign", assignSurvey, { observe: 'response' });
  }

  CreacionUsuario(usuario: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.urlLogin + 'create', JSON.stringify(usuario), { observe: 'response' });
}

public CreateClientes(cleinte: any):Observable<HttpResponse<any>> {
  return this.http.post<any>(this.urlClien + 'client/create', JSON.stringify(cleinte), { observe: 'response' });
}


}
