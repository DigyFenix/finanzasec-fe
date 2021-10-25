import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../model/Usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApi } from '../model/ResponseApi';
import { Variables } from '../enum/Variables.enum';
import { EndPoint } from '../enum/EndPoint.enum';
import { SocialAuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi: string = environment.urlApi;

  constructor(private http: HttpClient, private router: Router,  private socialAuthService: SocialAuthService) { }

  get urlImagenLocal(): string {
    return '../../assets/images/';
  }

  get tiempoDebounce() {
    return 400;
  }
  get tiempoDebounceRapido() {
    return 200;
  }

  get cuenta() {
    return localStorage.getItem(Variables.CUENTA_DEFAULT) || '';
  }
  get isLogin() {
    let token = localStorage.getItem(Variables.TOKEN_LOCALSTORAGE);
    return (token && token.length > 0) ? true : false;
  }

  private get headers() {
    return {
      headers: { 'content-type': 'application/json' }
    }
  }
  private body(obj: any) {
    return obj;
  }

  iniciarSesion(usuario: any) {
    return this.response(this.http.post(`${this.urlApi}/${EndPoint.LOGIN}`, this.body(usuario), this.headers));
  }

  cerrarSesion() {
    localStorage.removeItem(Variables.TOKEN_LOCALSTORAGE);
    localStorage.removeItem(Variables.CUENTA_DEFAULT);
    this.router.navigateByUrl("/" + EndPoint.LOGIN);
  }

  insertarActualizar(api: EndPoint, data: any) {
    let url = `${this.urlApi}/${api}`;
    this.logPeticion('insertarActualizar', url);
    return this.response(this.http.post(url, this.body(data), this.headers));
  }

  cargar(api: EndPoint, id: string | undefined) {
    let url;
    if (id) {
      url = `${this.urlApi}/${api}/${id}`;
    } else {
      url = `${this.urlApi}/${api}`;
    }
    this.logPeticion('cargar', url);
    return this.response(this.http.get(url));
  }


  buscar(api: EndPoint, filtro: string, id: string) {
    let url = `${this.urlApi}/${api}/buscar/`;

    let info;

    switch (api) {
      case EndPoint.CUENTA:
        info = {
          idusuario: id,
          filtro
        }
        break;
      case EndPoint.CATEGORIA:
        info = {
          cuenta: id,
          filtro
        }
        break;
      case EndPoint.SUBCATEGORIA:
        info = {
          categoria: id,
          filtro
        }
        break;
    }

    this.logPeticion('buscar', url, info);
    return this.response(this.http.post(url, this.body(info), this.headers));
  }

  buscarPorId(api: EndPoint, id: string | number) {
    let url = `${this.urlApi}/${api}/${id}`;
    this.logPeticion('buscarPorId', url, id);

    return this.response(this.http.get(url));
  }

  eliminar(api: EndPoint, id: string | number) {
    let url = `${this.urlApi}/${api}/${id}`;
    this.logPeticion('eliminar', url, id);

    return this.response(this.http.delete(url));
  }

  log(ubicacion: string, dato: any) {
    console.log(' =>> Ubicacion', ubicacion, ' =>> dato', dato);
  }


  private logPeticion(metodo: string, url: string, datos?: any) {
    console.log('=>>', metodo, ' =>> Url', url, ' =>> datos', datos);
  }

  //Creo un objeto de tipo ResponseApi con la peticion
  private response(solicitud: Observable<any>) {
    return solicitud.pipe(
      map(resp => ResponseApi.getInstance(resp))
    );
  }


}
