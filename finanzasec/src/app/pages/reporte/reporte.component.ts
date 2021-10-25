import { Component, OnInit } from '@angular/core';
import Cuenta from '../../model/Cuenta.IF';
import Movimiento from '../../model/Movimiento.IF';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';
import { FormsService } from '../../services/forms.service';
import { FormGroup, Validators } from '@angular/forms';
import { EndPoint } from '../../enum/EndPoint.enum';
import { Variables } from '../../enum/Variables.enum';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  private endPoint: EndPoint = EndPoint.REPORTE;
  cuenta = Cuenta.instance('');
  editar: boolean = false;
  cargando: boolean = false;

  movimientos: Movimiento[] = [];
  movimiento: Movimiento = Movimiento.instance('');

  ingresos: number = 0;
  gastos: number = 0;

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group({
    fechaInicial: [new Date(), [Validators.required]],
    fechaFinal: [new Date(), [Validators.required]]
  });


  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {
    this.api.buscarPorId(EndPoint.CUENTA, this.api.cuenta).subscribe(resp => {
      if (resp.ok) {
        this.cuenta = resp.data[0];
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }


  consultar() {
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }


    let { fechaInicial, fechaFinal } = this.formulario.value;
    let data = {
      cuenta: this.cuenta.id,
      fechaInicial, fechaFinal
    }

    this.api.insertarActualizar(this.endPoint, data).subscribe(resp => {

      this.api.log('Consultar', resp)
      if (resp.ok) {
        this.cargarDataEnArreglo(resp.data);
        this.ingresos = 0;
        this.gastos = 0;

        this.movimientos.forEach(mov => {
          if (mov.tipo === 'Ingreso') {
            this.ingresos += (mov.monto) ? mov.monto : 0;
          } else {
            this.gastos += (mov.monto) ? mov.monto : 0;
          }
        })

      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }


  cargarDataEnArreglo(data: any) {
    //Limpio el arreglo actual
    this.movimientos = [];

    //Cargo la data --LA DATA DEL API
    this.movimientos = JSON.parse(JSON.stringify(data));
  }


  verMovimiento(movimiento?: Movimiento) {
    this.editar = !this.editar;
    if (movimiento) {
      this.movimiento = movimiento;
    }
  }

  eliminarRegistro(forma: Movimiento) {
    this.api.eliminar(this.endPoint, forma.id).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Registro eliminado');
        this.consultar();
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }


}
