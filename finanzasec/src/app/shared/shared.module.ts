import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImgPipe } from './pipes/img.pipe';
import { BuscadorComponent } from './buscador/buscador.component';
import { LoadingComponent } from './loading/loading.component';
import { RegresarComponent } from './regresar/regresar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotfoundComponent,
    NavbarComponent,
    ImgPipe,
    BuscadorComponent,
    LoadingComponent,
    RegresarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NotfoundComponent,
    NavbarComponent,
    ImgPipe,
    BuscadorComponent,
    LoadingComponent,
    RegresarComponent
  ]
})
export class SharedModule { }
