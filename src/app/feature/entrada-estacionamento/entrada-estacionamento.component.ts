import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Tesseract from "tesseract.js";

@Component({
  selector: 'app-entrada-estacionamento',
  templateUrl: './entrada-estacionamento.component.html',
  styleUrls: ['./entrada-estacionamento.component.css']
})
export class EntradaEstacionamentoComponent implements OnInit, AfterViewInit{
  @ViewChild('videoElement') public videoElement!: ElementRef;
  @ViewChild('canvasElement') public canvasElement!: ElementRef;

  public ocrResult!: string;
  public cameraActive: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // this.setupCamera();
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
    Tesseract.recognize(
        canvas.toDataURL(),
        'eng',
        {
          logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
      this.ocrResult = text;
      console.log(text);
    });
  }

  requestCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (this.videoElement.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
            this.cameraActive = true; // Ativa a exibição do vídeo
          }
        })
        .catch(err => {
          console.error('Erro ao acessar a câmera:', err);
          // Aqui você pode adicionar uma mensagem para o usuário
        });
    } else {
      console.error('Acesso à câmera não disponível.');
      // Aqui você pode adicionar uma mensagem para o usuário
    }
  }
}
