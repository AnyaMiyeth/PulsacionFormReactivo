import { Persona } from './../pulsacion/models/persona';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';


const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/*
const httpOptionsAutorization = {
  headers: new HttpHeaders({ 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjMxODAwMDAwMDAwIiwicm9sZSI6WyJSb2wxIiwiUm9sMiJdLCJuYmYiOjE1OTEyNTIyNjksImV4cCI6MTU5MTg1NzA2OSwiaWF0IjoxNTkxMjUyMjY5fQ.pCjRuSoVOt7ItnZJu8ZOM4YRiIzaOMgb7sa_GjG3yyA` })
};
*/

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  get(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl + 'api/Persona')
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Persona[]>('Consulta Persona', null))
        );
  }

  post(persona: Persona): Observable<Persona> {
        return this.http.post<Persona>(this.baseUrl + 'api/Persona/' , persona)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Persona>('Registrar Persona', null))
        );
  }


  put(persona: Persona): Observable<any> {
    const url = `${this.baseUrl}api/persona/${persona.identificacion}`;
    return this.http.put(url, persona, httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<any>('Editar Persona'))
    );
  }

  getId(id: string): Observable<Persona> {
    const url = `${this.baseUrl + 'api/persona'}/${id}`;
      return this.http.get<Persona>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona>('Buscar Persona', null))
      );
  }

  delete(persona: Persona| string): Observable<string> {
    const id = typeof persona === 'string' ? persona : persona.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/persona/'+ id)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<string>('Elimiar Persona', null))
    );
  }
}
