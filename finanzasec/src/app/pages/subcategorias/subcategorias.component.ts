import { Component, OnInit } from '@angular/core';
import Categoria from 'src/app/model/Categoria.IF';
import SubCategoria from 'src/app/model/SubCategoria.IF';
import { EndPoint } from '../../enum/EndPoint.enum';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';
import { Variables } from '../../enum/Variables.enum';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.SUBCATEGORIA;
  editar: boolean = false;

  //Variables para la tabla
  subcategorias: SubCategoria[] = [];
  cargando: boolean = true;
  subcategoria: SubCategoria = SubCategoria.instance('');

  //Categorias
  categorias: Categoria[] = [];
  categoria: Categoria = Categoria.instance('');


  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group({
    id: [,]
  });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {
    this.cargarCategorias();

    this.fs.setFomulario(this.formulario);
    this.formulario.reset(this.categoria);
    this.formulario.valueChanges.subscribe(datos => {
      this.categoria = this.categorias[datos.id];
      this.cargarSubCategorias();
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

  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargarSubCategorias() {
    this.cargando = true;
    this.api.cargar(this.endPoint, this.categoria.id).subscribe(resp => {
      this.api.log('cargarSubCategorias', resp)
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


  buscar(termino: string) {

    if(!this.categoria.id) return;

    //Establesco quien solicito la sugerencia
    if (termino.length > 0) {
      this.api.buscar(this.endPoint, termino, this.categoria.id).subscribe(resp => {
        if (resp.ok) {
          this.subcategorias = JSON.parse(JSON.stringify(resp.data));
        } else {
          this.sa.error('Error', resp.error)
        }
      }, (error) => {
        this.sa.error('Error', error)
      });
    } else {
      this.cargarSubCategorias();
    }
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

  nuevoEditar(subcategoria?: SubCategoria) {
    if (!this.categoria.id) {
      this.sa.error('Error', 'Debe seleccionar una categoria');
      return;
    }
    this.editar = !this.editar;
    if (subcategoria) {
      this.subcategoria = subcategoria;
    } else {
      this.subcategoria = SubCategoria.instance('');
    }
  }

  guardado(actualizar: boolean) {
    if (actualizar) this.cargarSubCategorias();
    this.editar = !this.editar;

  }

  eliminarRegistro(forma: SubCategoria) {
    this.api.eliminar(this.endPoint, forma.id).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Registro eliminado');
        this.cargarSubCategorias();
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });
  }


}
