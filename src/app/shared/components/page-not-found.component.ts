import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

  constructor(private readonly router: Router) { }

  public goToHome(): void {
    this.router.navigateByUrl('');
  }
}
