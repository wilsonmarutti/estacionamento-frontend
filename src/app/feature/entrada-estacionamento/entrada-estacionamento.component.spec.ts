import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaEstacionamentoComponent } from './entrada-estacionamento.component';

describe('EntradaEstacionamentoComponent', () => {
  let component: EntradaEstacionamentoComponent;
  let fixture: ComponentFixture<EntradaEstacionamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaEstacionamentoComponent]
    });
    fixture = TestBed.createComponent(EntradaEstacionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
