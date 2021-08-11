import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public footerMaxHeight: number = 0;

  private screenHeight: number = 0;

  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(): void {
    this.screenHeight = window.innerHeight;
    this.footerMaxHeight = this.screenHeight - 130;
  }
}
