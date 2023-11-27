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

  it('deve atribuir um array vazio à variável "vagas" quando o EstacionamentoService retornar um erro', () => {
    spyOn(estacionamentoService, 'getVagas').and.returnValue(throwError({}));

    component.getVagas();

    expect(estacionamentoService.getVagas).toHaveBeenCalled();
    expect(component.vagas).toEqual([]);
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

});
