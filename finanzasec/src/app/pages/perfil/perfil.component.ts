import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/Usuario.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario = Usuario.instance('');

  constructor(private api:ApiService) {
    this.usuario = api.usuario;
  }

  ngOnInit(): void {
  }

}
