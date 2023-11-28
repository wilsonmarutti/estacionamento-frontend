import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaEstacionamentoComponent } from './entrada-estacionamento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { of } from 'rxjs';

const TesseractMock = {
    recognize: jasmine.createSpy('recognize').and.returnValue(Promise.resolve({ data: { text: 'recognized text' } }))
};


describe('EntradaEstacionamentoComponent', () => {
    let component: EntradaEstacionamentoComponent;
    let fixture: ComponentFixture<EntradaEstacionamentoComponent>;
    let canvasElement: any;
    let context: any;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EntradaEstacionamentoComponent],
            imports: [HttpClientTestingModule]
        }).compileComponents();
        
        fixture = TestBed.createComponent(EntradaEstacionamentoComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
        
        canvasElement = fixture.debugElement.query(By.css('canvas')).nativeElement;
        context = canvasElement.getContext('2d');
        spyOn(canvasElement, 'getContext').and.returnValue(context);
        // Espionar os métodos do contexto do canvas que você espera que sejam chamados
        spyOn(context, 'clearRect');
        spyOn(context, 'beginPath');
        spyOn(context, 'rect');
        spyOn(context, 'stroke');
    });
    
    afterEach(() => {
        if (canvasElement.getContext.calls) {
            canvasElement.getContext.calls.reset();
        }
    });
    
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('#setupCamera should get user media', (done) => {
        const mockMediaStream = new MediaStream(); // Mock do MediaStream
        spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve(mockMediaStream));
        const videoElement = fixture.debugElement.query(By.css('video'));
        component.videoElement = videoElement;
        
        component.setupCamera();
        
        fixture.whenStable().then(() => {
            expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
            expect(videoElement.nativeElement.srcObject).toBe(mockMediaStream);
            done();
        });
    });
    
    it('#drawHighlight should draw a rectangle on the canvas', () => {
        component.canvasElement = { nativeElement: canvasElement };
        component.drawHighlight();
        
        // Verificar se o contexto do canvas foi limpo
        expect(context.clearRect).toHaveBeenCalledWith(0, 0, canvasElement.width, canvasElement.height);
        // Verificar se o caminho foi iniciado para desenhar
        expect(context.beginPath).toHaveBeenCalled();
        // Verificar se um retângulo foi desenhado com as coordenadas corretas
        expect(context.rect).toHaveBeenCalledWith(20, 320, canvasElement.width - 40, 100);
        // Verificar se o traçado do retângulo foi realizado
        expect(context.stroke).toHaveBeenCalled();
    });
    
    it('should capture, recognize text, find a spot and save the car to the spot', async () => {
        const canvasElement = fixture.debugElement.query(By.css('canvas')).nativeElement;
        const context = canvasElement.getContext('2d');
        const videoElement = fixture.debugElement.query(By.css('video')).nativeElement;
        
        spyOn(canvasElement, 'getContext').and.returnValue(context);
        spyOn(context, 'drawImage').and.stub();
        spyOn(canvasElement, 'toDataURL').and.returnValue('data:image/png;base64,...');
        spyOn(component, 'drawHighlight').and.callThrough();
        spyOn(component, 'recognizeText').and.callThrough();
        spyOn(component, 'buscaVaga').and.callThrough();
        spyOn(component, 'salvarCarroVaga').and.callThrough();
        
        // Aqui substituímos a implementação padrão do moment
        // para retornar um valor específico quando chamado.
        spyOn<any>(moment, 'call').and.returnValue(moment('2023-11-27T00:00:00.000Z'));
        
        component.videoElement = { nativeElement: videoElement };
        component.canvasElement = { nativeElement: canvasElement };
        
        // Chama o método capture, que por sua vez chama recognizeText, buscaVaga e salvarCarroVaga
        component.capture();
        await fixture.whenStable();
        
        expect(context.drawImage).toHaveBeenCalledWith(videoElement, 0, 0, 640, 480);
        expect(component.drawHighlight).toHaveBeenCalled();
        expect(component.recognizeText).toHaveBeenCalled();
        
        // O recognizeText chama o Tesseract.recognize e, em seguida, buscaVaga
        expect(TesseractMock.recognize).toHaveBeenCalledWith('data:image/png;base64,...', 'eng');
        expect(component.buscaVaga).toHaveBeenCalledWith('recognized text');
        
        // Verifica se o estacionamentoService.getVagas foi chamado e, em seguida, salvarCarroVaga
        expect(component.estacionamentoService.getVagas).toHaveBeenCalled();
        expect(component.salvarCarroVaga).toHaveBeenCalledWith('vaga1');
        
        // Verifica se o estacionamentoService.salvarVagas foi chamado com os argumentos corretos
        const expectedPayload = {
            id: ['vaga1'],
            placaCarro: 'recognized text',
            dataHoraEntrada: "11-27-23:00:11:11" // Este valor deve corresponder ao formato especificado
        };
        expect(component.estacionamentoService.salvarVagas).toHaveBeenCalledWith(expectedPayload);
    });
    
});
