import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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

  getPagamento(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pagamento`);
  }

  baixarVaga(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vagas/editar`, data);
  }
  salvarVagas(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vagas/salvar`, data);
  }
  processarPagamento(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pagamento/processarPagamento`, data);
  }
}
