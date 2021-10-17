import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';
import Cuenta from '../../model/Cuenta.IF';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {


  private endPoint: EndPoint = EndPoint.CUENTA;
  editar: boolean = false;

  //Variables para la tabla
  cuentas: Cuenta[] = [];
  cargando: boolean = true;

  cuenta: Cuenta = Cuenta.instance('');

  constructor(
    private apiS: ApiService,
    private sa: SaService
  ) {

  }

  ngOnInit(): void {
    this.cargar();
  }

  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargar() {
    this.cargando = true;
    this.apiS.cargar(this.endPoint).subscribe(resp => {
      this.cargando = false;
      this.cuentas = [];
      if (resp.ok) {
        this.cargarDataEnArreglo(resp.data);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error ) => {
      this.sa.error('Error', error)
    });
  }

  buscar(termino: string) {
    //Establesco quien solicito la sugerencia
    if (termino.length > 0) {
      this.apiS.buscar(this.endPoint, termino).subscribe(resp => {
        if (resp.ok) {
          this.cuentas = JSON.parse(JSON.stringify(resp.data));
        } else {
          this.sa.error('Error', resp.error)
        }
      }, (error) => {
        this.sa.error('Error', error)
      });
    } else {
      this.cargar();
    }
  }

  cargarDataEnArreglo(data: any) {
    //Limpio el arreglo actual
    this.cuentas = [];

    //Cargo la data --LA DATA DEL API
    this.cuentas = JSON.parse(JSON.stringify(data));

  }

  nuevoEditar(categoria?: Cuenta) {
    this.editar = !this.editar;
    if (categoria) {
      this.cuenta = categoria;
    } else {
      this.cuenta = Cuenta.instance('');
    }
  }

  guardado(actualizar: boolean) {
    if (actualizar) this.cargar();
    this.editar = !this.editar;
  }

  eliminarRegistro(forma: Cuenta) {
    this.apiS.eliminar(this.endPoint, forma.id).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Registro eliminado');
        this.cargar();
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }

}
