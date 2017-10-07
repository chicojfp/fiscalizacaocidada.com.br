import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  deputados: any[] = null;
  numeroPartidos: any[];

  deputado = null;
  modalAtivo = false;

  ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
    'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
    'SC', 'SP', 'SE', 'TO'];
  ufSelecionada = 'PE';

  constructor(public http: Http) {

    this.recuperarListaDeputados();

  }

  recuperarListaDeputados() {
    this.http.get('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100&siglaUf=' 
      + this.ufSelecionada + '&ordem=ASC&ordenarPor=nome').subscribe(x => {
      const resposta = x.json();
      // console.log(resposta);
      this.deputados = resposta.dados;
      this.recuperarNrPartidos();
    });

  }

  atualizarUF(uf: string) {
     this.ufSelecionada = uf;

     this.recuperarListaDeputados();
  }

  recuperarNrPartidos() {
    const counts = {};
    for (let i = 0; i < this.deputados.length; i++) {
        counts[this.deputados[i].siglaPartido] = 1 + (counts[this.deputados[i].siglaPartido] || 0);
    }
    this.numeroPartidos = [];
    Object.keys(counts).forEach(i => this.numeroPartidos.push({descricao: i, qtd: counts[i]}));

    console.log(this.numeroPartidos);
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
