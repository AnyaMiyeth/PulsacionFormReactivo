
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
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) 
    { 

      this.baseUrl = baseUrl;
    }


}
