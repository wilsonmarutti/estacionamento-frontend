import { TestBed } from '@angular/core/testing';

import { EstacionamentoService } from './estacionamento.service';

describe('EstacionamentoService', () => {
  let service: EstacionamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstacionamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
