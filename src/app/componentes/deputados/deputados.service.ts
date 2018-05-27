import { ExcelenciaBaseService } from './../excelencia/excelencia.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DeputadosService extends ExcelenciaBaseService {

  deputados: any[] = [];
  deputadosFiltrados: any[] = [];
  counts = {};

  deputado = null;
  modalAtivo = false;
  partidos = [];

  proximaConsulta = null;

  constructor(public http: Http) { 
    super();
  }

  public retornarFiltroUF(uf): String {
    if (uf) {
      return '&siglaUf=' + uf;
    }
    return '';
  }

  recuperarListaDeputados(uf: string): Observable<any[]> {
    this.deputados = [];
    this.counts = {};
    return new Observable(observer => {
      this.carregarDeputados('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=600' +
          this.retornarFiltroUF(uf) + '&ordem=ASC&ordenarPor=nome').subscribe(
            resposta => {
              this.partidos = [];
              this.tratarDadosDeputado(resposta);

              observer.next(this.deputados);
          });

    });
  }

  public tratarDadosDeputado(resposta) {
    resposta.dados.forEach(deputado => {
      this.deputados.push(deputado);
      deputado.partido = this.adicionarPartido(this.partidos, deputado.siglaPartido);
    });
    this.mapearPartidos(this.partidos);
    this.carregarProximosDeputados(resposta.links.filter(i => i.rel === 'next'));
  }

  carregarProximosDeputados(links: any[]) {
    if (links.length > 0) {
      this.carregarDeputados(links[0].href).subscribe( resposta => {
        this.tratarDadosDeputado(resposta);
      });
    }
  }

  carregarDeputados(url: string): Observable<any> {
    return this.http.get(url).map(
      x => {
        const resposta = x.json();
        return resposta;
    });
  }

  isUFSelecionada(uf) {
    return uf === uf;
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
