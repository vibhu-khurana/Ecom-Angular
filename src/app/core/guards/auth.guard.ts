import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) { }

  //Can implement guard logic as per requirement
  public canActivate(): boolean {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
