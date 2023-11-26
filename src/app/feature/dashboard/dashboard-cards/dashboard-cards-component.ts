import {Component, OnInit} from "@angular/core";
import {InfoDashboardCardsInterface} from "../../../../core/interfaces/info-dashboard-cards-interface";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-cards-component.html',
  styleUrls: ['../dashboard.component.css',]
})
export class DashboardCardsComponent implements OnInit{
  public InfoDashboardCards!: InfoDashboardCardsInterface
  constructor(

  ) {}
  ngOnInit(): void {
    this.getDadosCard()
  }

  private getDadosCard(){
    this.InfoDashboardCards =
      {
        vagaOcupada: 1,
        vagaDisponivel: 9,
        qtdReceitaDia: 321.312,
        qtdVagasOcupadasDia: 50
      }
  }

}
