import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../app.service";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upbar',
  templateUrl: './upbar.component.html',
  styleUrls: ['./upbar.component.css']
})
export class UpbarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor (
    public layoutService: LayoutService,
    private router: Router
  ) { }

  public entradaCarro () {
    this.router.navigate(['/entrar'])
  }

  public home () {
    this.router.navigate(['/home'])
  }
}
