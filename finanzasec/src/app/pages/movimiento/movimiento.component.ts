import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import Movimiento from '../../model/Movimiento.IF';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  @Input() movimiento: Movimiento;

  titulo: string = "";



  constructor(public fs: FormsService) {
    this.movimiento = Movimiento.instance('');
  }

  ngOnInit(): void {
  }

}
