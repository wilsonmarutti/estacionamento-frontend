import { DashboardComponent } from './dashboard.component';
import { EstacionamentoService } from '../../services/estacionamento.service';
import {Observable, of, throwError} from 'rxjs';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardCardsComponent } from "./dashboard-cards/dashboard-cards-component";
import { TableModule } from "primeng/table";
import { QRCodeModule } from "angularx-qrcode";
import { ButtonModule } from "primeng/button";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let estacionamentoServiceStub: Partial<EstacionamentoService>;
  let estacionamentoService: EstacionamentoService;

  beforeEach(async () => {
    estacionamentoServiceStub = {
      getVagas: () => of([
        {
          _id: "65612cffb47581dc9642452b",
          id: "1",
          numVaga: 1,
          disponivel: false,
          placaCarro: "abd-1312",
          __v: 0,
          dataHoraEntrada: "2023-11-25T10:00:00.000Z"
        },
        {
          _id: "65614f67fc31c2d41bbfc10a",
          id: "2",
          numVaga: 2,
          disponivel: false,
          placaCarro: "",
          __v: 0
        }
      ]),
      getPagamento: () => of([
        {
        "_id": "6564d8d55d62de42868f9495",
        "id": "65612cffb47581dc9642452b",
        "dataEntrada": "2023-11-25T10:00:00.000Z",
        "dataSaida": "2001-11-27T23:14:11.080Z",
        "placaCarro": "abd-1312",
        "pago": true,
        "valorTotal": 12,
        "__v": 0
      },
      {
        "_id": "6564dc385d62de42868f94a1",
        "id": "65612cffb47581dc9642452b",
        "dataEntrada": "2023-11-25T10:00:00.000Z",
        "dataSaida": "2001-11-27T23:15:11.038Z",
        "placaCarro": "abd-1312",
        "pago": true,
        "valorTotal": 312,
        "__v": 0
      },
      ]),
      processarPagamento: () => of({
        savedPagamento: {
          "id": "65614f67fc31c2d41bbfc10a",
          "dataEntrada": "2001-11-27T23:17:11.053Z",
          "dataSaida": "2001-11-27T23:17:11.079Z",
          "placaCarro": "| i\nCMG-3164\n",
          "pago": true,
          "valorTotal": 0.00007222222222222222,
          "_id": "656523a35d62de42868f95a9",
          "__v": 0
        }
      }),

      baixarVaga: () => of({
        "id": "65614f67fc31c2d41bbfc10a",
        "numVaga": 2,
        "disponivel": true,
        "placaCarro": "",
        "_id": "656523a35d62de42868f95a8",
        "__v": 0
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, DashboardCardsComponent ],
      imports: [ TableModule, QRCodeModule, ButtonModule, HttpClientTestingModule ],
      providers: [ { provide: EstacionamentoService, useValue: estacionamentoServiceStub } ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    estacionamentoService = TestBed.inject(EstacionamentoService);
    spyOn(component, 'resetGrid').and.stub();
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ser renderizado componente app-dashboard-card', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-dashboard-card')).not.toBe(null);
  });

  it('deve atribuir as vagas retornadas pelo EstacionamentoService à variável "vagas"', () => {
    const mockVagas = [
       {
          _id: "65612cffb47581dc9642452b",
          id: "1",
          numVaga: 1,
          disponivel: false,
          placaCarro: "abd-1312",
          __v: 0,
          dataHoraEntrada: "2023-11-25T10:00:00.000Z"
        },
        {
          _id: "65614f67fc31c2d41bbfc10a",
          id: "2",
          numVaga: 2,
          disponivel: false,
          placaCarro: "",
          __v: 0
        }
    ];
    spyOn(estacionamentoService, 'getVagas').and.returnValue(of(mockVagas));

    component.getVagas();

    expect(estacionamentoService.getVagas).toHaveBeenCalled();
    expect(component.vagas).toEqual(mockVagas);
  });


  it('deve chamar o método "initChart" no ngOnInit', () => {
    spyOn(component, 'initChart');

    component.ngOnInit();

    expect(component.initChart).toHaveBeenCalled();
  });

  it('deve chamar o método "getVagas" no ngOnInit', () => {
    spyOn(component, 'getVagas');

    component.ngOnInit();

    expect(component.getVagas).toHaveBeenCalled();
  });

  it('deve chamar o método "calcularPagamento" ao clicar no botão "Calcular Pagamento"', () => {
    spyOn(component, 'calcularPagamento');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.calcularPagamento).toHaveBeenCalled();
  });

  it('deve chamar o método "calcularPagamento" com o parâmetro correto ao clicar no botão "Calcular Pagamento"', () => {
    spyOn(component, 'calcularPagamento');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.calcularPagamento).toHaveBeenCalledWith({
      _id: "65612cffb47581dc9642452b",
      id: "1",
      numVaga: 1,
      disponivel: false,
      placaCarro: "abd-1312",
      __v: 0,
      dataHoraEntrada: "2023-11-25T10:00:00.000Z"
    });
  });

  it('deve chamar o método "processarPagamento" do EstacionamentoService ao clicar no botão "Calcular Pagamento"', () => {
    spyOn(estacionamentoService, 'processarPagamento').and.returnValue(of({}));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(estacionamentoService.processarPagamento).toHaveBeenCalled();
  });

  it('deve chamar o método "baixarVaga" do EstacionamentoService ao clicar no botão "Calcular Pagamento"', () => {
    spyOn(estacionamentoService, 'baixarVaga').and.returnValue(of({}));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(estacionamentoService.baixarVaga).toHaveBeenCalled();
  });

});
