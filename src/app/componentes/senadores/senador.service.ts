import { ExcelenciaBaseService } from './../excelencia/excelencia.service';
import { Excelencia } from './../excelencia/excelencia';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class SenadorService extends ExcelenciaBaseService {

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
      return '?uf=' + uf;
    }
    return '';
  }

  recuperarListaDeputados(uf: string): Observable<any[]> {
    this.deputados = [];
    this.counts = {};
    return new Observable(observer => {
      this.carregarDeputados('https://legis.senado.leg.br/dadosabertos/senador/lista/atual' +
          this.retornarFiltroUF(uf)).subscribe(
            resposta => {
              this.partidos = [];
              this.mapearParaExcelencia(resposta);
              observer.next(this.deputados);
          });

    });
  }

  public mapearParaExcelencia(resposta) {
    resposta.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.forEach(excelencia => {
      const exc: Excelencia = {
        nome: excelencia.IdentificacaoParlamentar.NomeParlamentar,
        partido: excelencia.IdentificacaoParlamentar.SiglaPartidoParlamentar,
        urlFoto: excelencia.IdentificacaoParlamentar.UrlFotoParlamentar,
        siglaUf: excelencia.IdentificacaoParlamentar.UfParlamentar
      };
      this.deputados.push(exc);
      exc.partido = this.adicionarPartido(this.partidos, excelencia.IdentificacaoParlamentar.SiglaPartidoParlamentar);
    });
    this.mapearPartidos(this.partidos);
    // this.carregarProximosDeputados(resposta.links.filter(i => i.rel === 'next'));
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

}
