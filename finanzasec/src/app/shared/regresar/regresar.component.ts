import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-regresar',
  templateUrl: './regresar.component.html',
  styleUrls: ['./regresar.component.css']
})
export class RegresarComponent {

  @Output() regresar:EventEmitter<string> = new EventEmitter();

  constructor() { }

  eventoRegresar() {
      this.regresar.emit('');
  }

}
