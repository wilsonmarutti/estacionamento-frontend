import {Component, OnInit} from '@angular/core';
import {VagasInterface} from "../../../core/vagas-interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',]
})
export class DashboardComponent implements OnInit {
  public chartOptions: any;
  public chartData: any;
  public vagas!: VagasInterface[];

  constructor() {
  }

  ngOnInit() {
    this.initChart();
    this.getVagas();
  }

  private getVagas() {
    this.vagas = [
      {
        disponivel: false,
        numVaga: 1,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 2,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 3,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 4,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 5,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: false,
        numVaga: 6,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 7,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: false,
        numVaga: 8,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: true,
        numVaga: 9,
        placaCarro: 'GET81E9'
      },

      {
        disponivel: false,
        numVaga: 10,
        placaCarro: 'GET81E9'
      },
      {
        disponivel: false,
        numVaga: 11,
        placaCarro: 'GET81E9'
      },      {
        disponivel: false,
        numVaga: 11,
        placaCarro: 'GET81E9'
      },
    ]
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
