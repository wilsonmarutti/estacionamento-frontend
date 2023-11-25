import {Component, OnInit} from '@angular/core';
import {VagasInterface} from "../../../core/vagas-interface";
import {EstacionamentoService} from "../../services/estacionamento.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',]
})
export class DashboardComponent implements OnInit {
  public chartOptions: any;
  public chartData: any;
  public vagas!: VagasInterface[];
  public items!: MenuItem[];

  constructor(
    private estacionamentoService: EstacionamentoService,
  ) {
  }

  ngOnInit() {
    this.initChart();
    this.getVagas();
    this.getMenu()
  }

  private getVagas() {
    this.estacionamentoService.getVagas().subscribe(
      vagas => {
        this.vagas = vagas
      },
      error => {
      }
    );
  }

  private getMenu() {
    this.items = [
      {label: 'Ação 1', icon: 'pi pi-refresh', command: () => {
          console.log('fdhasj')
        }},
      {label: 'Ação 2', icon: 'pi pi-times', command: () => {
          console.log('fdhasj')
        }},
      // outras ações
    ];
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
