import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../model/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApi } from '../model/ResponseApi';
import { Variables } from '../enum/Variables.enum';
import { EndPoint } from '../enum/EndPoint.enum';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi: string = environment.urlApi;

  usuario: Usuario = Usuario.instance('');
  private token: String = '';

  constructor(private http: HttpClient, private router: Router) { }

  get urlImagenLocal(): string {
    return '../../assets/images/';
  }

  get tiempoDebounce() {
    return 400;
  }
  get tiempoDebounceRapido() {
    return 200;
  }

  private get headers() {
    return {
      headers: { 'content-type': 'application/json' }
    }
  }

  private body(obj: any) {
    return obj;
  }

  login(usuario: any) {
    return this.response(this.http.post(`${this.urlApi}/${EndPoint.LOGIN}`, this.body(usuario), this.headers));
  }

  logout() {
    localStorage.delete(Variables.TOKEN_LOCALSTORAGE);
    this.router.navigateByUrl("/" + EndPoint.LOGIN);
  }

  insertarActualizar(api: EndPoint, data: any) {
    let url = `${this.urlApi}/${api}`;
    this.logPeticion('InsertarActualizar', url, this.body(data));

    return this.response(this.http.post(url, this.body(data), this.headers));
  }

  cargar(api: EndPoint) {
    let url = `${this.urlApi}/${api}`;
    return this.response(this.http.get(url));
  }


  buscar(api: EndPoint, data: string) {
    let url = `${this.urlApi}/${api}/buscar/`;
    let info = {
      idusuario: localStorage.getItem(Variables.TOKEN2),
      filtro: data
    }
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

    return this.response(this.http.delete(url))
  }

  log(ubicacion: string, dato: any) {
    console.log(' =>> Ubicacion', ubicacion, ' =>> dato', dato);
  }


  logPeticion(metodo: string, url: string, datos?: any) {
    console.log('=>>', metodo, ' =>> Url', url, ' =>> datos', datos);
  }

  //Creo un objeto de tipo ResponseApi con la peticion
  private response(solicitud: Observable<any>) {
    return solicitud.pipe(
        map(resp => ResponseApi.getInstance(resp))
      );
  }


}
