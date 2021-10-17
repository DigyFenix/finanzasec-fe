import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SaService {

  constructor() { }



  private alertBasico(icono: SweetAlertIcon, titulo: string, mensaje: string = '') {

    Swal.fire(titulo,  (mensaje.length>0 ? JSON.stringify(mensaje) :''), icono);
  }

  realizado(titulo: string, mensaje?: string) {
    this.alertBasico('success', titulo, mensaje)
  }

  error(titulo: string, mensaje?: string) {
    this.alertBasico('error', titulo, mensaje);
  }

  loading(texto: string) {
    this.alertBasico('info', texto);
    Swal.showLoading();
  }

  confirmacion(titulo: string, mensaje?: string) {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    });
  }
}
