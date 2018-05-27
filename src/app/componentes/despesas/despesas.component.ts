import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  idExecelencia: number = null;
  despesas: any;

  constructor(public router: ActivatedRoute, public http: Http) {
    this.router.params.subscribe(p => {
      this.idExecelencia = p['id'];
      this.recuperarDespesas(this.idExecelencia);
    });
  }

  public recuperarDespesas(id) {
    this.http.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ano=2016&mes=12&itens=1000`)
      .subscribe( p => {
        this.despesas = p.json().dados;
        this.tratarDespesas(this.despesas);
      });
  }

  public tratarDespesas(despesas: any[]) {
    let sumario = {};
    let mapa_despesas = [];
    for (let i = 0; i < despesas.length; i++) {
      const resumo = (sumario[despesas[i].tipoDespesa] || {});

      resumo.tipoDespesa = despesas[i].tipoDespesa;
      resumo.valorDocumento = (resumo.valorDocumento || 0) + Number(despesas[i].valorDocumento);
      resumo.valorGlosa = (resumo.valorGlosa || 0) + Number(despesas[i].valorGlosa);
      resumo.valorLiquido = (resumo.valorLiquido || 0) + Number(despesas[i].valorLiquido);

      sumario[this.despesas[i].tipoDespesa] = resumo;
    }
    // this.numeroPartidos = [];
    Object.keys(sumario).forEach(i => mapa_despesas.push({tipoDespesa: i, detalhe: sumario[i]}));


    this.despesas = mapa_despesas.sort((a, b) => {
      return (<string>a.tipoDespesa).localeCompare(b.tipoDespesa);
    });
  }

  ngOnInit() {
    // let chart = c3.generate({
    //   bindto: '#chart',
    //       data: {
    //       columns: [
    //           ['data1', 30, 200, 100, 400, 150, 250],
    //           ['data2', 50, 20, 10, 40, 15, 25]
    //       ]
    //       }
    //   });
  }

}
