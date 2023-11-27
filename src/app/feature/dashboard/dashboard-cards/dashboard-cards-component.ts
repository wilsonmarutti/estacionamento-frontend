import {Component, OnInit} from "@angular/core";
import {InfoDashboardCardsInterface} from "../../../../core/interfaces/info-dashboard-cards-interface";
import { EstacionamentoService } from '../../../services/estacionamento.service';
import { addDays, isWithinInterval, parseISO } from "date-fns";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-cards-component.html',
  styleUrls: ['../dashboard.component.css',]
})
export class DashboardCardsComponent implements OnInit{
  public InfoDashboardCards!: any;
  constructor(
    private estacionamentoService: EstacionamentoService

  ) {}
  ngOnInit(): void {
    this.getDadosCard()
  }

  private getDadosCard() { 
    this.getDadosCardPagamento();
    this.getDadosCardVagas();
  }

  private getDadosCardPagamento(){
    this.estacionamentoService.getPagamento().subscribe(
      (dados: any) => {
        const objetosFiltrados = this.filtrarPorIntervaloDeDatas(dados, '2023-11-17');
        this.InfoDashboardCards = {
          qtdReceitaDia: this.somarValoresTotais(objetosFiltrados),
          qtdVagasOcupadasDia: dados.filter((obj: any) => obj.dataSaida !== null).length,
        }
      },
    );
  }

  private getDadosCardVagas() {
    let vagasDisponiveis: number;
    let vagasOcupadas: number;
    this.estacionamentoService.getVagas()
      .subscribe((vagas: any) => {
        vagasDisponiveis = vagas.filter((vaga: any) => vaga.disponivel === true).length;
        vagasOcupadas = vagas.filter((vaga: any) => vaga.disponivel === false).length;
        this.InfoDashboardCards = {
          ...this.InfoDashboardCards,
          vagaDisponivel: vagasDisponiveis,
          vagaOcupada: vagasOcupadas,
        }
      },
      
    );
  }

  filtrarPorIntervaloDeDatas(objetos: any, dataInicio: string) {
    const startDate = parseISO(dataInicio);
    const endDate = addDays(startDate, 10);

    return objetos.filter((obj: any) => {
      const entrada = parseISO(obj.dataEntrada);
      const saida = obj.dataSaida ? parseISO(obj.dataSaida) : null;
      if (!saida) {
        return isWithinInterval(entrada, { start: startDate, end: endDate });
      }

      return isWithinInterval(entrada, { start: startDate, end: endDate }) ||
        isWithinInterval(saida, { start: startDate, end: endDate });
    });
  }
    
  private somarValoresTotais(objetosFiltrados: any): number {
    return objetosFiltrados.reduce((acumulador: any, objeto: any) => acumulador + objeto.valorTotal, 0);
  }
}
