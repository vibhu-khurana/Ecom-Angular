import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Cart[]> {

  constructor(private readonly cartService: CartService) { }

  public resolve(): Observable<Cart[]> {
    return this.cartService.allCartItems();
  }
}
