import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/Usuario.model';
import { ApiService } from '../../services/api.service';
import Cuenta from '../../model/Cuenta.IF';
import { EndPoint } from '../../enum/EndPoint.enum';
import { SaService } from '../../services/sa.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { Variables } from '../../enum/Variables.enum';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  cuentas: Cuenta[] = [];
  cargando: boolean = true;

  endPoint: EndPoint = EndPoint.USUARIO;
  endPointCuenta: EndPoint = EndPoint.CUENTA;

  usuario: Usuario = Usuario.instance('');
  cuenta: Cuenta = Cuenta.instance('');

  //Lo creo con formulario reactivo porque es mas facil
  formulario: FormGroup = this.fs.fb.group({ id: [,] });

  constructor(private api: ApiService, private sa: SaService, public fs: FormsService) { }

  ngOnInit(): void {
    this.cargar();
    this.fs.setFomulario(this.formulario);
    this.formulario.reset(this.cuenta);
    this.formulario.valueChanges.subscribe(datos => {
      this.cuenta = datos;
      localStorage.setItem(Variables.CUENTA_DEFAULT, this.cuenta.id)
    })
  }

  //======================================================================== Metodos PARA BUSCAR de la pantalla
  cargar() {
    this.cargando = true;

    //Cuentas
    this.api.cargar(this.endPointCuenta, undefined).subscribe(resp => {
      this.cuentas = [];
      if (resp.ok) {
        this.cargarDataEnArreglo(resp.data);
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });

    //Usuario
    this.api.cargar(this.endPoint, undefined).subscribe(resp => {
      if (resp.ok) {
        this.usuario = Usuario.instance(resp.data[0])
      } else {
        this.sa.error('Error', resp.error)
      }
    }, (error) => {
      this.sa.error('Error', error)
    });

    this.cargando = false;
  }


  cargarDataEnArreglo(data: any) {
    //Limpio el arreglo actual
    this.cuentas = [];

    //Cargo la data --LA DATA DEL API
    this.cuentas = JSON.parse(JSON.stringify(data));
  }

}
