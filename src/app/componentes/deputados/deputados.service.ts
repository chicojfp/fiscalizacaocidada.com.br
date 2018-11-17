import { ExcelenciaBaseService } from './../excelencia/excelencia.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeputadosService extends ExcelenciaBaseService {

  excelencias: any[] = [];
  deputadosFiltrados: any[] = [];
  counts = {};

  deputado = null;
  modalAtivo = false;
  partidos = [];

  proximaConsulta = null;

  constructor(public http: Http) {
    super(http);
    this.urlConsulta = 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=600&ordem=ASC&ordenarPor=nome';
  }

  public retornarFiltroUF(uf): String {
    if (uf) {
      return '&siglaUf=' + uf;
    }
    return '';
  }

  abriModalDeputado(idDeputado: number) {
    this.http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + `${idDeputado}`)
      .subscribe(x => {
      this.deputado = x.json();
      this.modalAtivo = true;
    });
    // this.recuperarDadosDeputado(idDeputado);
  }

  fecharModal() {
    this.modalAtivo = false;
  }

}
