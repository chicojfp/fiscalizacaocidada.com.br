import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeputadosComponent } from './componentes/deputados/deputados.component';
import { DeputadoDetalheComponent } from './componentes/deputado-detalhe/deputado-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    DeputadosComponent,
    DeputadoDetalheComponent
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
