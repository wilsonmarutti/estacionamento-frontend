import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaEstacionamentoComponent } from './entrada-estacionamento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { of } from 'rxjs';
import { EstacionamentoService } from 'src/app/services/estacionamento.service';
import { ElementRef } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

const TesseractMock = {
    recognize: jasmine.createSpy('recognize').and.returnValue(Promise.resolve({ data: { text: 'recognized text' } }))
};

let component: EntradaEstacionamentoComponent;
let fixture: ComponentFixture<EntradaEstacionamentoComponent>;
let estacionamentoServiceStub: Partial<EstacionamentoService>;
let estacionamentoService: EstacionamentoService;
let context: any;
const canvas = document.createElement('canvas');

describe('EntradaEstacionamentoComponent', () => {
    
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
            salvarVagas: () => of({
                "id": ["65612cffb47581dc9642452b"],
                "placaCarro": "abd-1312",
                "dataHora": "2023-11-25T10:00:00Z"
            }),
        };
        
        await TestBed.configureTestingModule({
            declarations: [ EntradaEstacionamentoComponent ],
            imports: [ HttpClientTestingModule, QRCodeModule ],
            providers: [ { provide: EstacionamentoService, useValue: estacionamentoServiceStub } ]
        }).compileComponents();
        spyOn(canvas, 'getContext').and.returnValue(context);
        
        
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(EntradaEstacionamentoComponent);
        component = fixture.componentInstance;
        estacionamentoService = TestBed.inject(EstacionamentoService);
        fixture.detectChanges();
        component.canvasElement = new ElementRef(canvas);
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
    
    it('#salvarCarroVaga should call the service and update the component properties', () => {
        const id = '123';
        const ocrResult = 'recognized text';
        const dataHoraEntrada = moment(new Date()).format("MM-DD-YY:HH:MM:SS");
        const retorno = {
            dataHoraEntrada: dataHoraEntrada,
            placaCarro: ocrResult,
            numVaga: 1
        };
        spyOn(component.estacionamentoService, 'salvarVagas').and.returnValue(of(retorno));
        
        component.ocrResult = ocrResult;
        component.salvarCarroVaga(id);
        
        expect(component.estacionamentoService.salvarVagas).toHaveBeenCalledWith({
            id: [id],
            placaCarro: ocrResult,
            dataHoraEntrada: dataHoraEntrada
        });
        expect(component.dadosCardQrCode).toEqual(retorno);
        expect(component.isVisible).toBe(true);
        expect(component.codigoQRCode).toBe(dataHoraEntrada + ocrResult + retorno.numVaga);
    });
    
    it('#buscaVaga should call the service and save the car', () => {
        const vagas = [
            {
                _id: "65612cffb47581dc9642452b",
                id: "1",
                numVaga: 1,
                disponivel: true,
                placaCarro: "",
                __v: 0
            },
            {
                _id: "65614f67fc31c2d41bbfc10a",
                id: "2",
                numVaga: 2,
                disponivel: false,
                placaCarro: "xyz-123",
                __v: 0
            }
        ];
        spyOn(component.estacionamentoService, 'getVagas').and.returnValue(of(vagas));
        spyOn(component, 'salvarCarroVaga');
        
        component.buscaVaga();
        
        expect(component.estacionamentoService.getVagas).toHaveBeenCalled();
        expect(component.salvarCarroVaga).toHaveBeenCalledWith(vagas[0]._id);
    });
            
    it('should display modal when isVisible is true', () => {
        component.isVisible = true;
        component.dadosCardQrCode = {
            numVaga: 1,
            dataHoraEntrada: '2023-11-25T10:00:00Z'
        };
        component.codigoQRCode = 'QR Code Data';
        fixture.detectChanges();
        const modalElement = fixture.nativeElement.querySelector('.modal');
        expect(modalElement).toBeTruthy();
        expect(modalElement.textContent).toContain('Sua vaga é: 1');
        expect(modalElement.textContent).toContain('Hora da entrada: 2023-11-25T10:00:00Z');
        const qrCodeElement = fixture.nativeElement.querySelector('.qr-code-container');
        expect(qrCodeElement).toBeTruthy();
    });

});
