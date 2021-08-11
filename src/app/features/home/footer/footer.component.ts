import { Component } from '@angular/core';
import { HOME } from 'src/app/core/constants/home.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public readonly CONSTANTS = HOME;
}
