import { SenadorService } from './componentes/senadores/senador.service';
import { SenadoresComponent } from './componentes/senadores/senadores.component';
import { DeputadosService } from './componentes/deputados/deputados.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeputadosComponent } from './componentes/deputados/deputados.component';
import { DeputadoDetalheComponent } from './componentes/deputado-detalhe/deputado-detalhe.component';
import { ExcelenciaResumoComponent } from './componentes/excelencia-resumo/excelencia-resumo.component';
import { DespesasComponent } from './componentes/despesas/despesas.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'deputados', component: DeputadosComponent },
  { path: 'senadores', component: SenadoresComponent },
  { path: 'deputados/:id/despesas',      component: DespesasComponent },
  { path: '', redirectTo: 'deputados', pathMatch: 'full' },
  // {
  //   path: 'heroes',
  //   component: DespesasComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: DespesasComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DeputadosComponent,
    DeputadoDetalheComponent,
    ExcelenciaResumoComponent,
    DespesasComponent,
    SenadoresComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
      , { useHash: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DeputadosService, SenadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
