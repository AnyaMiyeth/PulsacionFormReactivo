import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './modal/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private modalService: NgbModal) { }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      if (error.status == '500') {
         this.mostrarError500(error);
      }
      if (error.status == '400') {
        this.mostrarError400(error);
      }
       else if (error.status == "401") {
        this.mostrarError400(error);
      }
        
      return of(result as T);
    };
  }
  private mostrarError(error: any): void {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = error.errors;
    console.error(error);
  }
 private mostrarError500(error: any) {
    console.error(error);
  }

  public log(message: string) {
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = 'Resultado Operación';
    messageBox.componentInstance.message = message;
  }
  private mostrarError400(error: any): void {
    console.error(error.errros);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = mensajeValidaciones;

  }

}



