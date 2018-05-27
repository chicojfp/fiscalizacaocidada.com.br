import { Excelencia } from './../excelencia/excelencia';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-excelencia-resumo',
  templateUrl: './excelencia-resumo.component.html',
  styleUrls: ['./excelencia-resumo.component.scss']
})
export class ExcelenciaResumoComponent implements OnInit {

  @Input()
  excelencia: Excelencia;

  constructor() { }

  ngOnInit() {
  }

}
