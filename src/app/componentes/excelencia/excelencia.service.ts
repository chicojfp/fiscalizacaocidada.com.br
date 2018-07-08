import { Excelencia } from './../excelencia/excelencia';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ExcelenciaBaseService {
    ufs: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
        'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
        'SC', 'SP', 'SE', 'TO'];
    partidos = [];
    excelencias: any[] = [];
    urlConsulta = '';

    constructor(public http: Http) { }

    public recuperarUFs(): string[] {
        return this.ufs;
    }

    protected adicionarPartido(partidos: any[], sigla: string): any {
        let partido = partidos[sigla];
        if (!partido) {
            partido = { sigla: sigla, qtd: 0, ativo: true };
        }
        partido.qtd += 1;
        partidos[sigla] = partido;

        return partido;
    }

    protected mapearPartidos(partidos: any[]) {
        this.partidos.splice(0, this.partidos.length);
        Object.keys(partidos).forEach(i => this.partidos.push(partidos[i]));
        this.partidos = this.partidos.sort((a, b) => {
            return b.qtd - a.qtd;
        });
    }

    public carregarExcelencias(url: string): Observable<any> {
        return this.http.get(url).map(
            x => {
                const resposta = x.json();
                return resposta;
            });
    }

    public retornarFiltroUF(uf): String {
        if (uf) {
            return '?uf=' + uf;
        }
        return '';
    }

    protected recuperarURLConsulta(uf: string): string {
        return this.urlConsulta +
            this.retornarFiltroUF(uf);
    }

    protected recuperarListaExcelencia(resposta: any): any[] {
        return resposta.dados;
    }

    public mapearRespostaParaExcelencias(resposta) {
        this.recuperarListaExcelencia(resposta).forEach(deputado => {
            const excelencia = this.mapearItemParaExcelencia(deputado);
            this.excelencias.push(excelencia);
            excelencia.partido = this.adicionarPartido(this.partidos, excelencia.partido.sigla);
        });
        this.mapearPartidos(this.partidos);
        this.carregarDemaisExcelencias(resposta);
    }

    protected http2https(ex: Excelencia) {
        ex.urlFoto = ex.urlFoto.replace('http:', 'https:');
        return ex;
    }

    public mapearItemParaExcelencia(resposta: any): Excelencia {
        // const exc = resposta;
        const exc = this.http2https(resposta);
        exc.partido = { sigla: resposta.siglaPartido, ativo: false };
        return exc;
    }

    carregarDemaisExcelencias(resposta: any) {
        if (!resposta.links) {
          return;
        }
        const links = resposta.links.filter(i => i.rel === 'next');

        if (links.length > 0) {
            this.carregarDeputados(links[0].href).subscribe(resp => {
                this.mapearRespostaParaExcelencias(resp);
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

    public recuperarExcelencias(uf: string): Observable<any[]> {
        this.excelencias = [];
        return new Observable(observer => {
            this.carregarExcelencias(this.recuperarURLConsulta(uf)).subscribe(
                resposta => {
                    this.partidos = [];
                    this.mapearRespostaParaExcelencias(resposta);
                    observer.next(this.excelencias);
                });
        });
    }

    realizarConsultaExcelencia(url: string): Observable<any> {
        return this.http.get(url).map(
            x => {
                const resposta = x.json();
                return resposta;
            });
    }

}
