import { Injectable } from '@angular/core';

@Injectable()
export class TimelineService {

  constructor() { }

  public getTimelineItens(): any[] {
    return [{titulo: 'Aumento dos vereadores do Recife', 
        descricao: 'Foi concedido um reajuste muito acima da inflação para a legislatura atual da câmara de veradores do recife',
        nrColaboradores: '321423'},
    {titulo: 'Aumento do prefeito de Surubim',
        descricao: 'Foi concedido aumento desproporcional para o prefeito e vice-prefeito da cidade',
        nrColaboradores: '200'},
    {titulo: 'Fraude na licitação de duplicação da PE-90 entre os muncípios de Surubim e Vertentes',
        descricao: 'Suspeita de grande sobrepreço nos valores praticados na duplicação da rodovia PE-90 entre Surubim e Vertentes.',
        nrColaboradores: '999999'}];
  }

}
