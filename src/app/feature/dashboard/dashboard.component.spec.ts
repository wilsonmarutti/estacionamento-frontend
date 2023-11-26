import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { EstacionamentoService } from "../../services/estacionamento.service";
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {VagasInterface} from "../../../core/interfaces/vagas-interface";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let estacionamentoService: jasmine.SpyObj<EstacionamentoService>;

  beforeEach(async () => {
    estacionamentoService = jasmine.createSpyObj('EstacionamentoService', ['getVagas']);
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: EstacionamentoService, useValue: estacionamentoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    estacionamentoService = TestBed.inject(EstacionamentoService) as jasmine.SpyObj<EstacionamentoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize chart and vagas', () => {
      const mockVagas = [
        { id: '1', numVaga: 101, disponivel: true },
        { id: '2', numVaga: 102, disponivel: false, placaCarro: 'ABC-1234' }
      ] as VagasInterface[];
      estacionamentoService.getVagas.and.returnValue(of(mockVagas));
      fixture.detectChanges();
      expect(component.chartOptions).toBeTruthy();
      expect(component.chartData).toBeTruthy();
      expect(component.vagas).toEqual(mockVagas);
    });
  });

  describe('getVagas', () => {
    it('should set vagas on success', () => {
      const mockVagas = [
        { id: '3', numVaga: 103, disponivel: true },
        { id: '4', numVaga: 104, disponivel: false, placaCarro: 'XYZ-7890' }
      ] as VagasInterface[];
      estacionamentoService.getVagas.and.returnValue(of(mockVagas));
      component.ngOnInit();
      expect(component.vagas).toEqual(mockVagas);
    });

    it('should handle error', () => {
      const consoleSpy = spyOn(console, 'error');
      estacionamentoService.getVagas.and.returnValue(throwError(() => new Error('Error')));
      component.ngOnInit();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('receber', () => {
    it('should prepare payload from rowData', () => {
      const consoleSpy = spyOn(console, 'log');
      const mockRowData = { _id: '123', dataHoraEntrada: new Date() };
      component.receber(mockRowData);
      // Neste ponto, você poderia verificar se o payload foi preparado corretamente,
      // mas como o método não faz nada com o payload (não o armazena ou o envia),
      // não há nada para testar. Se o método for alterado para fazer algo com o payload,
      // esse teste deve ser atualizado.
      expect(consoleSpy).toHaveBeenCalledWith(mockRowData);
    });
  });

  // Adicione outros testes conforme necessário.
  // ...

});
