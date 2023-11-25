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
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {QRCodeModule} from "angularx-qrcode";
import {SplitButtonModule} from "primeng/splitbutton";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    HttpClientModule,
    AppRoutingModule,
    StyleClassModule,
    TableModule,
    ButtonModule,
    QRCodeModule,
    SplitButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
