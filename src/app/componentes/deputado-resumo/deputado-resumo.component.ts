import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deputado-resumo',
  templateUrl: './deputado-resumo.component.html',
  styleUrls: ['./deputado-resumo.component.scss']
})
export class DeputadoResumoComponent implements OnInit {

  @Input()
  excelencia: any;

  constructor() { }

  ngOnInit() {
  }

}
