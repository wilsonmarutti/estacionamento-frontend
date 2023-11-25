import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VagasInterface} from "../../core/vagas-interface";

@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {
  private apiUrl = 'https://estacionamento-server.azurewebsites.net';
  constructor(
    private http: HttpClient
  ) { }

  getVagas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vagas`);
  }

  postVagas(data: VagasInterface): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vagas`, data);
  }
  putVagas(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vagas/editar`, data);
  }
  salvarVagas(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vagas/salvar`, data);
  }
}
