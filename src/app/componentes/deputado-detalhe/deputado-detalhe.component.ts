import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deputado-detalhe',
  templateUrl: './deputado-detalhe.component.html',
  styleUrls: ['./deputado-detalhe.component.css']
})
export class DeputadoDetalheComponent implements OnInit {

  @Input()
  public deputado;

  constructor() { }

  ngOnInit() {
  }

}
