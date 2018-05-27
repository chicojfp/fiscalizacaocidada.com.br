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

    public recuperarUFs(): String[] {
        return this.ufs;
    }

    protected adicionarPartido(partidos: any[], sigla: string): any {
        let partido = partidos[sigla];
        if (!partido) {
            partido = {sigla: sigla, qtd: 0, ativo: true};
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