import { Excelencia } from './../excelencia/excelencia';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ExcelenciaBaseService {
    ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
        'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
        'SC', 'SP', 'SE', 'TO'];
    partidos = [];
    excelencias: any[] = [];
    urlConsulta = '';

    constructor(public http: Http) { }

    public recuperarUFs(): String[] {
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

    public mapearItemParaExcelencia(resposta: any): Excelencia {
        const exc = resposta;
        exc.partido = { sigla: resposta.siglaPartido };
        return exc;
    }

    carregarDemaisExcelencias(resposta: any) {
        if (!resposta.links) return;
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
                    console.log('Resposta 2');
                    console.log(resposta);
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

    // recuperarNrPartidos() {
    // for (let i = 0; i < this.deputados.length; i++) {
    //     this.counts[this.deputados[i].siglaPartido] = 1 + (this.counts[this.deputados[i].siglaPartido] || 0);
    // }
    // this.partidos = [];
    // Object.keys(this.counts).forEach(i => this.partidos.push({descricao: i, qtd: this.counts[i], ativo: true}));

    // this.partidos = this.partidos.sort((a, b) => {
    //     return b.qtd - a.qtd;
    // });

    // this.deputadosFiltrados = this.deputados;
    // }
}