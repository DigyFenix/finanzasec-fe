import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte/reporte.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { PerfilComponent } from './perfil/perfil.component';


const childRoutes: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'subcategorias', component: SubcategoriasComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'reporte', component: ReporteComponent }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class PagesChildsModule { }
