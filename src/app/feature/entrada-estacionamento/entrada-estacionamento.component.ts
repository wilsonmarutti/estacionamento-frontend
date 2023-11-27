import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Tesseract from "tesseract.js";
import {EstacionamentoService} from "../../services/estacionamento.service";
import * as moment from "moment";

@Component({
  selector: 'app-entrada-estacionamento',
  templateUrl: './entrada-estacionamento.component.html',
  styleUrls: ['./entrada-estacionamento.component.css']
})
export class EntradaEstacionamentoComponent implements AfterViewInit{
  @ViewChild('videoElement') public videoElement!: ElementRef;
  @ViewChild('canvasElement') public canvasElement!: ElementRef;

  public ocrResult!: string;
  public isVisible: boolean = false;
  public codigoQRCode: string = ''
  public dadosCardQrCode: any;

  constructor(
    private estacionamentoService: EstacionamentoService,
  ) {}

  ngAfterViewInit(): void {
    this.setupCamera();
  }

  setupCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            this.videoElement.nativeElement.srcObject = stream;
            this.videoElement.nativeElement.onloadedmetadata = () => {
              this.videoElement.nativeElement.play();
              this.drawHighlight();
            };
          })
          .catch(err => {
            console.error('Error accessing the camera', err);
          });
    } else {
      alert('Sorry, camera not available.');
    }
  }

drawHighlight(): void {
  const context = this.canvasElement.nativeElement.getContext('2d');
  if (context) {
    // Limpe o canvas antes de desenhar o novo retângulo
    context.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

    // Ajuste estas coordenadas e tamanho conforme necessário para enquadrar a placa corretamente
    const x = 20; // Ajuste para a coordenada X do início da placa
    const y = 320; // Ajuste para a coordenada Y do início da placa
    const width = this.canvasElement.nativeElement.width - 40; // Largura aproximada da placa
    const height = 100; // Altura aproximada da placa

    // Desenhe o retângulo
    context.beginPath();
    context.rect(x, y, width, height);
    context.strokeStyle = 'red';
    context.lineWidth = 5;
    context.stroke();
  }
}

  capture(): void {
    const context = this.canvasElement.nativeElement.getContext('2d');
    context.drawImage(this.videoElement.nativeElement, 0, 0, 640, 480);
    this.drawHighlight();
    this.recognizeText();
  }

  recognizeText(): void {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.filter = 'contrast(150%)';

    ctx.drawImage(this.videoElement.nativeElement, 0, 0, 640, 480);
    Tesseract.recognize(
      canvas.toDataURL(),
      'eng',
    ).then(({ data: { text } }) => {
      this.ocrResult = text;
      this.buscaVaga(text);

    });
  }

  private buscaVaga(placa: string) {
    this.estacionamentoService.getVagas().subscribe(
      vagas => {
        const vagaEncontrada = vagas.find((vaga: any) => vaga.disponivel)
        this.salvarCarroVaga(vagaEncontrada._id)
      }
    );
  }

  private salvarCarroVaga(id: string) {
    const payload = {
      id: [`${id}`],
      placaCarro: this.ocrResult,
      dataHoraEntrada: moment(new Date).format("MM-DD-YY:HH:MM:SS")
    }
    this.estacionamentoService.salvarVagas(payload)
      .subscribe(retorno => {
        this.dadosCardQrCode = retorno;
        console.log(this.dadosCardQrCode)
        this.isVisible = true;
        this.codigoQRCode = `${retorno.dataHoraEntrada}` + `${retorno.placaCarro}` + `${retorno.numVaga}`;
      })
  }

}
