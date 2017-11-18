import { DeputadosService } from './deputados.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-deputados',
  templateUrl: './deputados.component.html',
  styleUrls: ['./deputados.component.scss']
})
export class DeputadosComponent implements OnInit {

  deputados: any[] = [];
  deputadosFiltrados: any[] = [];

  deputado = null;
  modalAtivo = false;

  proximaConsulta = null;

  ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
    'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR',
    'SC', 'SP', 'SE', 'TO'];
  ufSelecionada = 'PE';

  constructor(public deputadosService: DeputadosService) {
    this.atualizarUF(null);
  }

  ngOnInit() { }

  atualizarUF(uf: string) {
    this.deputadosService.recuperarListaDeputados(uf).subscribe(
      x => {
        this.ufSelecionada = uf;
        console.log(x);
        this.deputados = x;
      }
    );
  }

  filtrarPartido(sigla: string) {
    console.log(sigla);
    const partido = this.deputadosService.partidos.filter(p => p.sigla === sigla);
    console.log(partido);
    partido[0].ativo = !partido[0].ativo;
  }

  recuperarDeputados() {
    return this.deputados.filter(d => d.partido.ativo);
  }

}
