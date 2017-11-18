import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DeputadosService {

  deputados: any[] = [];
  deputadosFiltrados: any[] = [];
  // numeroPartidos: any[];
  counts = {};

  deputado = null;
  modalAtivo = false;
  partidos = [];

  proximaConsulta = null;

  constructor(public http: Http) { }

  public retornarFiltroUF(uf): String {
    if (uf) {
      return '&siglaUf=' + uf;
    }
    return '';
  }

  recuperarListaDeputados(uf: string): Observable<any[]> {
    this.deputados = [];
    // this.numeroPartidos = [];
    this.counts = {};
    return new Observable(observer => {
      this.carregarDeputados('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=600' +
          this.retornarFiltroUF(uf) + '&ordem=ASC&ordenarPor=nome').subscribe(
            resposta => {
              this.tratarDadosDeputado(resposta);

              observer.next(this.deputados);
          });

    });
  }

  public tratarDadosDeputado(resposta) {
    const partidos = [];
    resposta.dados.forEach(deputado => {
      this.deputados.push(deputado);

      let partido = partidos[deputado.siglaPartido];
      console.log(partido);
      if (!partido) {
        partido = {sigla: deputado.siglaPartido, qtd: 0, ativo: true};
        // this.partidos.push(partido.sigla, partido);
      }
      partido.qtd += 1;
      partidos[deputado.siglaPartido] = partido;
      deputado.partido = partido;
    });

    this.partidos = [];
    Object.keys(partidos).forEach(i => this.partidos.push(partidos[i]));

    console.log(this.partidos);
    this.carregarProximosDeputados(resposta.links.filter(i => i.rel === 'next'));
    // this.recuperarNrPartidos();
  }

  carregarProximosDeputados(links: any[]): Observable<any> {
    if (links.length > 0) {
      return this.carregarDeputados(links[0].href);
    }
  }

  carregarDeputados(url: string): Observable<any> {
    return this.http.get(url).map(
      x => {
        const resposta = x.json();
        return resposta;
    });
  }

  recuperarNrPartidos() {
    for (let i = 0; i < this.deputados.length; i++) {
        this.counts[this.deputados[i].siglaPartido] = 1 + (this.counts[this.deputados[i].siglaPartido] || 0);
    }
    this.partidos = [];
    Object.keys(this.counts).forEach(i => this.partidos.push({descricao: i, qtd: this.counts[i], ativo: true}));

    this.partidos = this.partidos.sort((a, b) => {
      return b.qtd - a.qtd;
    });

    this.deputadosFiltrados = this.deputados;
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
