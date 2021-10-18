import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import SubCategoria from '../../../model/SubCategoria.IF';
import { EndPoint } from '../../../enum/EndPoint.enum';
import Categoria from '../../../model/Categoria.IF';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { FormsService } from '../../../services/forms.service';
import { SaService } from '../../../services/sa.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {


  private endPoint: EndPoint = EndPoint.SUBCATEGORIA;
  titulo: string = "Sub Categoria";
  opciones:string [] = ["Ingreso","Gasto"];

  @Input() subcategoria: SubCategoria = SubCategoria.instance('');;
  @Output() guardado: EventEmitter<boolean> = new EventEmitter();

  @Input() categoria: Categoria = Categoria.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group(
    {
      id: [,],
      descripcion: [, [Validators.required, Validators.minLength(3)]],
      tipo:[,]
    });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formulario.valueChanges.subscribe(datos => {
      this.subcategoria = datos;
    })
  }

  iniciarFormulario() {
    //Le establesco al servicio que estoy trabajando con este formulario
    this.fs.setFomulario(this.formulario);
    //Le paso los datos del objeto al formulario
    this.formulario.reset(this.subcategoria);

    this.titulo = `${((this.categoria.id) ? "Edicion " : "Creacion ") + this.titulo} `;
  }

  guardar() {
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }

    this.subcategoria.categoria = this.categoria.id;
    this.api.insertarActualizar(this.endPoint, this.subcategoria).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Datos guardados', '');
        this.guardado.emit(true);
      } else {
        this.sa.error('Error', resp.error)
      }
    });
  }

}
