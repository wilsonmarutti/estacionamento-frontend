import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import {StyleClassModule} from 'primeng/styleclass';
import { UpbarComponent } from './feature/upbar/upbar.component';
import { TableModule } from 'primeng/table';
import {DashboardCardsComponent} from "./feature/dashboard/dashboard-cards/dashboard-cards-component";
import { EntradaEstacionamentoComponent } from './feature/entrada-estacionamento/entrada-estacionamento.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UpbarComponent,
    DashboardCardsComponent,
    EntradaEstacionamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StyleClassModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
