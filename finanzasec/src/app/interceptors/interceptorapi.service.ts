import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Variables } from '../enum/Variables.enum';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorapiService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Obtengo el token
    let token = localStorage.getItem(Variables.TOKEN_LOCALSTORAGE) || '';

    //Creo el header
    const headers = new HttpHeaders({
      'auth': token
    })

    //La request solo se puede usar una ves, por lo que la clono y le agrego el header
    const reqClonada = req.clone({
      headers
    });

    //Retorno la request clonada que ya contiene el token
    return next.handle(reqClonada).pipe(
      catchError(this.manejarError)
    )

  }

  //Los errores de las peticiones pasaran por aqui, por lo que se pueden guardar en algun log.
  manejarError(error: HttpErrorResponse) {
    return throwError(error['error']['error'])
  }

}
