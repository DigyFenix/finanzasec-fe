import { Component, OnInit } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import Categoria from '../../model/Categoria.IF';
import { ApiService } from '../../services/api.service';
import { SaService } from '../../services/sa.service';
import { Variables } from '../../enum/Variables.enum';
import Cuenta from '../../model/Cuenta.IF';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  private endPoint: EndPoint = EndPoint.CATEGORIA;
  editar: boolean = false;

  //Variables para la tabla
  categorias: Categoria[] = [];
  cargando: boolean = true;

  categoria: Categoria = Categoria.instance('');

  cuenta = Cuenta.instance('');

  constructor(private api: ApiService, private sa: SaService) { }

  ngOnInit(): void {
    this.cargar();
  }

  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargar() {
    this.cargando = true;

    this.api.cargar(this.endPoint, this.api.cuenta).subscribe(resp => {
      this.categorias = [];
      if (resp.ok) {
        this.cargarDataEnArreglo(resp.data);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });


    this.api.buscarPorId(EndPoint.CUENTA, this.api.cuenta).subscribe(resp => {
      if (resp.ok) {
        this.cuenta = resp.data[0];
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });


    this.cargando = false;
  }

  buscar(termino: string) {
    //Establesco quien solicito la sugerencia
    if (termino.length > 0) {
      this.api.buscar(this.endPoint, termino, this.api.cuenta).subscribe(resp => {
        if (resp.ok) {
          this.categorias = JSON.parse(JSON.stringify(resp.data));
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
    this.categorias = [];

    //Cargo la data --LA DATA DEL API
    this.categorias = JSON.parse(JSON.stringify(data));

  }

  nuevoEditar(categoria?: Categoria) {
    this.editar = !this.editar;
    if (categoria) {
      this.categoria = categoria;
    } else {
      this.categoria = Categoria.instance('');
    }
  }

  guardado(actualizar: boolean) {
    if (actualizar) this.cargar();
    this.editar = !this.editar;
  }

  eliminarRegistro(forma: Categoria) {
    this.api.eliminar(this.endPoint, forma.id).subscribe(resp => {
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
