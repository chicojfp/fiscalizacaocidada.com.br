import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-deputados',
  templateUrl: './deputados.component.html',
  styleUrls: ['./deputados.component.scss']
})
export class DeputadosComponent implements OnInit {

  deputados: any[] = [];
  numeroPartidos: any[];
  counts = {};

  deputado = null;
  modalAtivo = false;

  proximaConsulta = null;

  ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
    'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
    'SC', 'SP', 'SE', 'TO'];
  ufSelecionada = null;

  constructor(public http: Http) {
    this.recuperarListaDeputados();
  }

  ngOnInit() { }

  retornarFiltroUF(): String {
    if (this.ufSelecionada) {
      return '&siglaUf=' + this.ufSelecionada;
    }
    return '';
  }

  recuperarListaDeputados() {
    this.deputados = [];
    this.numeroPartidos = [];
    this.counts = {};
    const resposta = this.carregarDeputados('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=600' +
        this.retornarFiltroUF() + '&ordem=ASC&ordenarPor=nome');
  }

  carregarProximosDeputados(links: any[]) {
    if (links.length > 0) {
      this.carregarDeputados(links[0].href);
    }
  }

  carregarDeputados(url: string): any {
    this.http.get(url).subscribe(
      x => {
        const resposta = x.json();
        console.log(resposta.dados);
        resposta.dados.forEach(element => {
          this.deputados.push(element);
        });
        this.carregarProximosDeputados(resposta.links.filter(i => i.rel === 'next'))
        this.recuperarNrPartidos();
    });
  }

  atualizarUF(uf: string) {
     this.ufSelecionada = uf;

     this.recuperarListaDeputados();
  }

  recuperarNrPartidos() {
    for (let i = 0; i < this.deputados.length; i++) {
        this.counts[this.deputados[i].siglaPartido] = 1 + (this.counts[this.deputados[i].siglaPartido] || 0);
    }
    this.numeroPartidos = [];
    Object.keys(this.counts).forEach(i => this.numeroPartidos.push({descricao: i, qtd: this.counts[i]}));

    this.numeroPartidos = this.numeroPartidos.sort((a, b) => {
      return b.qtd - a.qtd;
    });

    // console.log(this.numeroPartidos);
  }

  isUFSelecionada(uf) {
    return this.ufSelecionada === uf;
  }

  abriModalDeputado(idDeputado: number) {
    this.http.get('https://dadosabertos.camara.leg.br/api/v2/deputados/' + `${idDeputado}`)
      .subscribe(x => {
      this.deputado = x.json();
      this.modalAtivo = true;
      console.log('exibindo deputado de id ' + idDeputado);
    });
    // this.recuperarDadosDeputado(idDeputado);
  }

  fecharModal() {
    this.modalAtivo = false;
  }

}
