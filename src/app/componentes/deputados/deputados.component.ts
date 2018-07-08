import { DeputadosService } from './deputados.service';
import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-deputados',
  templateUrl: './deputados.component.html',
  styleUrls: ['./deputados.component.scss']
})
export class DeputadosComponent implements OnInit {

  excelencias: any[] = [];
  excelenciasFiltradas: any[] = [];
  ufSelecionada = 'AL';

  constructor(public deputadosService: DeputadosService) {
    const ufs = this.deputadosService.recuperarUFs();
    this.ufSelecionada = ufs[Math.ceil(Math.random() * 27)];
    this.atualizarUF(this.ufSelecionada);
  }

  ngOnInit() { }

  recuperarUFs(): String[] {
    return this.deputadosService.recuperarUFs();
  }

  atualizarUF(uf: string) {
    this.deputadosService.recuperarExcelencias(uf).subscribe(
      excelencias => {
        this.ufSelecionada = uf;
        this.excelencias = excelencias;
      }
    );
  }

  filtrarPartido(sigla: string) {
    const partido = this.deputadosService.partidos.filter(p => p.sigla === sigla);
    partido[0].ativo = !partido[0].ativo;
  }

  recuperarDeputados() {
    return this.excelencias.filter(d => d.partido.ativo);
  }

  recuperarPartidos() {
    return this.deputadosService.partidos;
  }

}
