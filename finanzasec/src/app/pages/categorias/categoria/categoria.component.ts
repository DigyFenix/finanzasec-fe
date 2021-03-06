import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EndPoint } from '../../../enum/EndPoint.enum';
import Categoria from '../../../model/Categoria.IF';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { FormsService } from '../../../services/forms.service';
import { SaService } from '../../../services/sa.service';
import Cuenta from '../../../model/Cuenta.IF';
import { Variables } from '../../../enum/Variables.enum';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.CATEGORIA;
  titulo: string = "Categoria";

  @Input() categoria: Categoria = Categoria.instance('');;
  @Output() guardado: EventEmitter<boolean> = new EventEmitter();

  cuenta: Cuenta = Cuenta.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      id: [,],
      descripcion: [, [Validators.required, Validators.minLength(3)]]
    });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.categoria = datos;
    })

    this.obtenerCuenta();

  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);
    //Le paso los datos del objeto al formulario
    this.formulario.reset(this.categoria);

    this.titulo = `${((this.categoria.id) ? "Edicion " : "Creacion ") + this.titulo} `;
  }

  guardar() {
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }

    this.categoria.cuenta = this.api.cuenta;
    this.api.insertarActualizar(this.endPoint, this.categoria).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Datos guardados', '');
        this.guardado.emit(true);
      } else {
        this.sa.error('Error', resp.error)
      }
    });
  }

  obtenerCuenta() {
    this.api.buscarPorId(EndPoint.CUENTA, this.api.cuenta).subscribe(resp => {
      if (resp.ok) {
        this.cuenta = Cuenta.instance(resp.data[0]);
      } else {
        this.sa.error('Error', resp.error)
      }
    });
  }

}
