import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeputadosComponent } from './componentes/deputados/deputados.component';
import { DeputadoDetalheComponent } from './componentes/deputado-detalhe/deputado-detalhe.component';
import { DeputadoResumoComponent } from './componentes/deputado-resumo/deputado-resumo.component';

@NgModule({
  declarations: [
    AppComponent,
    DeputadosComponent,
    DeputadoDetalheComponent,
    DeputadoResumoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
