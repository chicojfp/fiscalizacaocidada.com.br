import { SenadorService } from './senador.service';
import { Component, OnInit } from '@angular/core';
import { ExcelenciaBaseService } from '../excelencia/excelencia.service';

@Component({
  selector: 'app-senadores',
  templateUrl: './senadores.component.html',
  styleUrls: ['./senadores.component.css']
})
export class SenadoresComponent implements OnInit {
  excelencias: any[] = [];
  excelenciasFiltradas: any[] = [];
  ufSelecionada = undefined;

  constructor(public senadoresService: SenadorService) {
    const ufs = this.senadoresService.recuperarUFs();
    this.ufSelecionada = ufs[Math.ceil(Math.random() * 27)];
    this.atualizarUF(this.ufSelecionada);
  }

  recuperarUFs(): String[] {
    return this.senadoresService.recuperarUFs();
  }

  ngOnInit() { }

  atualizarUF(uf: string) {
    this.senadoresService.recuperarExcelencias(uf).subscribe(
      excelencias => {
        this.ufSelecionada = uf;
        this.excelencias = excelencias;
      }
    );
  }

  filtrarPartido(sigla: string) {
    const partido = this.senadoresService.partidos.filter(p => p.sigla === sigla);
    partido[0].ativo = !partido[0].ativo;
  }

  recuperarDeputados() {
    return this.excelencias.filter(d => d.partido.ativo);
  }

  recuperarPartidos() {
    return this.senadoresService.partidos;
  }

}
