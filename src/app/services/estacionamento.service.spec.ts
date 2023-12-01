import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstacionamentoService } from './estacionamento.service';


describe('EstacionamentoService', () => {
    let service: EstacionamentoService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EstacionamentoService]
        });
        service = TestBed.inject(EstacionamentoService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('should retrieve the list of vagas', () => {
        const mockVagas = [{ id: 1, nome: 'Vaga 1' }, { id: 2, nome: 'Vaga 2' }];
        
        service.getVagas().subscribe((vagas) => {
            expect(vagas).toEqual(mockVagas);
        });
        
        const req = httpMock.expectOne(`${service.apiUrl}/vagas`);
        expect(req.request.method).toBe('GET');
        req.flush(mockVagas);
    });
    
    it('should retrieve the pagamento', () => {
        const mockPagamento = { id: 1, valor: 10.5 };
        
        service.getPagamento().subscribe((pagamento) => {
            expect(pagamento).toEqual(mockPagamento);
        });
        
        const req = httpMock.expectOne(`${service.apiUrl}/pagamento`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPagamento);
    });
    
    it('should send the salvarVagas request', () => {
        const mockData = [{ id: 1, nome: 'Vaga 1' }, { id: 2, nome: 'Vaga 2' }];
        
        service.salvarVagas(mockData).subscribe();
        
        const req = httpMock.expectOne(`${service.apiUrl}/vagas/salvar`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockData);
        req.flush({});
    });
    
    it('should send the processarPagamento request', () => {
        const mockData = { id: 1, valor: 10.5 };
        
        // Chama o serviço
        service.processarPagamento(mockData).subscribe();
        
        // Verifica se a requisição foi feita para a URL correta
        const req = httpMock.expectOne(`${service.apiUrl}/pagamento/processarPagamento`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockData);
        
        // Finaliza a requisição simulada
        req.flush({});
    });
    
    it('should send the baixarVaga request', () => {
        const mockData = { id: 1 };
        
        // Chama o serviço
        service.baixarVaga(mockData).subscribe();
        
        // Verifica se a requisição foi feita para a URL correta
        const req = httpMock.expectOne(`${service.apiUrl}/vagas/editar`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockData);
        
        // Finaliza a requisição simulada
        req.flush({});
    });
    
});

