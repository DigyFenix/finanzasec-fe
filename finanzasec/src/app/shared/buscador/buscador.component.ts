import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  @Output() busqueda: EventEmitter<string> = new EventEmitter();
  @Output() nuevo: EventEmitter<string> = new EventEmitter();

  @Input() botonNuevo:boolean = true;
  debouncer: Subject<string> = new Subject();

  constructor(private apis:ApiService){}

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(this.apis.tiempoDebounce))
      .subscribe(termino => {
        this.busqueda.emit(termino);
      });
  }

  buscar(termino: string) {
    this.debouncer.next(termino);
  }

  nuevoRegistro() {
    this.nuevo.emit();
  }

}
