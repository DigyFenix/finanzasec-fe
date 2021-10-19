import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import Categoria from '../../model/Categoria.IF';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';
import { FormsService } from '../../services/forms.service';
import SubCategoria from '../../model/SubCategoria.IF';
import Movimiento from '../../model/Movimiento.IF';
import Cuenta from '../../model/Cuenta.IF';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.MOVIMIENTO;
  editar: boolean = false;
  cargando: boolean = true;
  fechaHoy = new Date();

  movimiento: Movimiento = Movimiento.instance('');

  //Categorias
  categorias: Categoria[] = [];
  categoria: Categoria = Categoria.instance('');

  //Sub categorias
  subcategorias: SubCategoria[] = [];
  subcategoria: SubCategoria = SubCategoria.instance('');

  cuenta = Cuenta.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group({
    categoria: [,],
    subcategoria: [,],
    monto: [0, [Validators.required]],
    fecha: [new Date(), [Validators.required]],
    descripcion: [,]
  });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {
    this.iniciar()
  }

  iniciar() {
    this.cargarCategorias();
    this.cargarCuenta();
    this.fs.setFomulario(this.formulario);
    this.formulario.reset(this.movimiento);
    this.formulario.valueChanges.subscribe(datos => {
      this.movimiento = datos;
      let catTemp = this.categorias[datos.categoria];
      //Solo si se cambia categoria actualizo las sub categorias
      if (catTemp && (catTemp.id !== this.categoria.id)) {
        this.categoria = catTemp;
        this.cargarSubCategorias();
      } else {
        this.subcategoria = this.subcategorias[datos.subcategoria];
      }
    })
  }

  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargarCategorias() {
    this.cargando = true;
    this.api.cargar(EndPoint.CATEGORIA, this.api.cuenta).subscribe(resp => {
      this.categorias = [];
      if (resp.ok) {
        this.cargarCategoriasEnArreglo(resp.data);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
    this.cargando = false;
  }

  cargarCuenta() {
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


  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargarSubCategorias() {
    this.cargando = true;
    this.api.cargar(EndPoint.SUBCATEGORIA, this.categoria.id).subscribe(resp => {
      if (resp.ok) {
        this.cargarSubCategoriasEnArreglo(resp.data);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
    this.cargando = false;
  }


  cargarCategoriasEnArreglo(data: any) {
    //Limpio el arreglo actual
    this.categorias = [];

    //Cargo la data --LA DATA DEL API
    this.categorias = JSON.parse(JSON.stringify(data));
  }

  cargarSubCategoriasEnArreglo(data: any) {
    //Limpio el arreglo actual
    this.subcategorias = [];

    //Cargo la data --LA DATA DEL API
    this.subcategorias = JSON.parse(JSON.stringify(data));
  }

  guardar() {
    //Valido que el formulario sea valido
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.sa.error('', 'Formulario invalido');
      return;
    }
    this.movimiento.cuenta = this.api.cuenta;
    this.movimiento.subcategoria = this.subcategoria.id;

    this.api.insertarActualizar(this.endPoint, this.movimiento).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Datos guardados', '');
        this.movimiento = Movimiento.instance('');
        this.iniciar();
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }

}
