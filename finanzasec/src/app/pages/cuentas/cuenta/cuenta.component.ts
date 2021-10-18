import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EndPoint } from '../../../enum/EndPoint.enum';
import { ApiService } from '../../../services/api.service';
import { SaService } from '../../../services/sa.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../../services/forms.service';
import Cuenta from 'src/app/model/Cuenta.IF';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.CUENTA;
  titulo: string = "Categoria";

  @Input() cuenta: Cuenta;
  @Output() guardado: EventEmitter<boolean> = new EventEmitter();


  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      id: [,],
      usuario: [,],
      descripcion: [, [Validators.required, Validators.minLength(3)]]
    });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) {
    this.cuenta = Cuenta.instance('');
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.cuenta = datos;
    })
  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);
    //Le paso los datos del objeto al formulario
    this.formulario.reset(this.cuenta);
    this.titulo = `${((this.cuenta.id) ? "Edicion " : "Creacion ") + this.titulo} `;
  }

  guardar() {
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }
    this.extraerID();
    this.api.insertarActualizar(this.endPoint, this.cuenta).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Datos guardados', '');
        this.guardado.emit(true);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }

  extraerID() {
    if (typeof this.cuenta.usuario === 'object') {
      this.cuenta.usuario = JSON.parse(JSON.stringify(this.cuenta.usuario.id))
    }
  }
}
