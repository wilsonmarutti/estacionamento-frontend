
import { DashboardComponent } from './dashboard.component';
import { EstacionamentoService } from '../../services/estacionamento.service';
import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let estacionamentoServiceStub: Partial<EstacionamentoService>;

  beforeEach(async () => {
    // Crie um stub para o EstacionamentoService
    estacionamentoServiceStub = {
      getVagas: () => of([{
        "_id": "65612cffb47581dc9642452b",
        "id": "1",
        "numVaga": 1,
        "disponivel": false,
        "placaCarro": "abd-1312",
        "__v": 0,
        "dataHoraEntrada": "2023-11-25T10:00:00.000Z"
      },
      {
        "_id": "65614f67fc31c2d41bbfc10a",
        "id": "2",
        "numVaga": 2,
        "disponivel": false,
        "placaCarro": "",
        "__v": 0
      }
      ]),
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: EstacionamentoService, useValue: estacionamentoServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ser renderizado', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-dashboard')).not.toBe(null); // Verifica se o seletor do componente está presente no DOM
  });
});
