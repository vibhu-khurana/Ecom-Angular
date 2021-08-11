import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { Cart } from '../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartUrl = environment.backendApi + '/cart';

  constructor(private readonly apiService: ApiService) { }

  public allCartItems(): Observable<Cart[]> {
    return this.apiService.get(this.cartUrl);
  }

  public addToCart(cartObject: Cart): Observable<Cart> {
    return this.apiService.post(this.cartUrl, cartObject);
  }

  public updateCartItem(cartItem: Cart): Observable<Cart> {
    return this.apiService.put(this.cartUrl + '/' + cartItem.id, cartItem);
  }

  public removeItemFromCart(itemId: number): Observable<Cart> {
    return this.apiService.delete(this.cartUrl + '/' + itemId);
  }
}
