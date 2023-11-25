import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Tesseract from "tesseract.js";
import {EstacionamentoService} from "../../services/estacionamento.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-entrada-estacionamento',
  templateUrl: './entrada-estacionamento.component.html',
  styleUrls: ['./entrada-estacionamento.component.css']
})
export class EntradaEstacionamentoComponent implements OnInit, AfterViewInit{
  @ViewChild('videoElement') public videoElement!: ElementRef;
  @ViewChild('canvasElement') public canvasElement!: ElementRef;

  public ocrResult!: string;
  public isVisible: boolean = false;

  constructor(
    private estacionamentoService: EstacionamentoService,
  ) {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.setupCamera();
  }

  setupCamera(): void {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            this.videoElement!.nativeElement.srcObject = stream;
          })
          .catch(err => {
            console.error("Error accessing the camera", err);
          });
    } else {
      alert('Sorry, camera not available.');
    }
  }

  capture(): void {
    const context = this.canvasElement.nativeElement.getContext('2d');
    context.drawImage(this.videoElement.nativeElement, 0, 0, 640, 480);
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
        const vagaEncontrada = vagas.find((vaga: any) => vaga.disponivel == true)
        console.log(vagaEncontrada._id)
        this.salvarCarroVaga(vagaEncontrada._id)
      }
    );
  }

  private salvarCarroVaga(id: string) {
    const payload = {
      id: [`${id}`],
      placaCarro: this.ocrResult
    }
    this.estacionamentoService.salvarVagas(payload)
      .subscribe(retorno => {
        this.isVisible = true;
        console.log(retorno);
      })
  }

}
