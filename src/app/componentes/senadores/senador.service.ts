import { ExcelenciaBaseService } from './../excelencia/excelencia.service';
import { Excelencia } from './../excelencia/excelencia';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class SenadorService extends ExcelenciaBaseService {
  modalAtivo = false;
  partidos = [];
  proximaConsulta = null;

  constructor(public http: Http) {
    super(http);
    this.urlConsulta = 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual';
  }

  public mapearRespostaParaExcelencias(resposta) {
    resposta.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.forEach(excelencia => {
      const exc: Excelencia = {
        nome: excelencia.IdentificacaoParlamentar.NomeParlamentar,
        partido: excelencia.IdentificacaoParlamentar.SiglaPartidoParlamentar,
        urlFoto: excelencia.IdentificacaoParlamentar.UrlFotoParlamentar,
        siglaUf: excelencia.IdentificacaoParlamentar.UfParlamentar
      };
      this.excelencias.push(exc);
      exc.partido = this.adicionarPartido(this.partidos, excelencia.IdentificacaoParlamentar.SiglaPartidoParlamentar);
    });
    this.mapearPartidos(this.partidos);
  }

  protected recuperarListaExcelencia(resposta: any): any[] {
    return resposta.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
  }

  public mapearItemParaExcelencia(senador: any): Excelencia {
    return {
      nome: senador.IdentificacaoParlamentar.NomeParlamentar,
      partido: senador.IdentificacaoParlamentar.SiglaPartidoParlamentar,
      urlFoto: senador.IdentificacaoParlamentar.UrlFotoParlamentar,
      siglaUf: senador.IdentificacaoParlamentar.UfParlamentar
    };;
  }

}
