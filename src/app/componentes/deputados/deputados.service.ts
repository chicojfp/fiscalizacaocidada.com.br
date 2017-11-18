import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DeputadosService {

  deputados: any[] = [];
  deputadosFiltrados: any[] = [];
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

  private adicionarPartido(partidos: any[], sigla: string): any {
    let partido = partidos[sigla];
    if (!partido) {
      partido = {sigla: sigla, qtd: 0, ativo: true};
    }
    partido.qtd += 1;
    partidos[sigla] = partido;

    return partido;
  }

  private mapearPartidos(partidos: any[]) {
    this.partidos.splice(0, this.partidos.length);
    Object.keys(partidos).forEach(i => this.partidos.push(partidos[i]));
    this.partidos = this.partidos.sort((a, b) => {
      return b.qtd - a.qtd;
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
