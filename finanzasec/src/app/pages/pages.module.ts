import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { ReporteComponent } from './reporte/reporte.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { CuentaComponent } from './cuentas/cuenta/cuenta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { MovimientosComponent } from './movimientos/movimientos.component';


@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
    CuentaComponent,
    CategoriaComponent,
    SubcategoriaComponent,
    MovimientoComponent,
    ReporteComponent,

    CuentasComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
