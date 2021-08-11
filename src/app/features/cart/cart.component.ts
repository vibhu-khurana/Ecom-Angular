import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CART_CONSTANT } from 'src/app/core/constants/cart.constants';
import { Cart } from 'src/app/core/models/cart.model';
import { CartService } from 'src/app/core/services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public cartArr: Cart[] = [];
  public notInStockAlert: boolean = false;
  public totalCartPrice: number = 0;

  public readonly CONSTANT = CART_CONSTANT

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly cartService: CartService) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.cartArr = data.cartList;
      this.cartArr.forEach((item) => {
        this.totalCartPrice += item.quantity * item.product.mrp;
      })
    });
  }

  public goCheckout(): void {
    this.router.navigateByUrl('checkout');
  }

  public updateItemQuantity(event: any, item: Cart): void {
    if (event.target.value <= item.product.quantity) {
      this.notInStockAlert = false;
      this.totalCartPrice -= (Number(item.quantity) * Number(item.product.mrp));
      item.quantity = event.target.value;
      this.cartService.updateCartItem(item).subscribe(() => {
        this.totalCartPrice += (Number(item.quantity) * Number(item.product.mrp));
      }, (error: any) => {
        console.log('Error while updating the item\'s quantity in cart', error);
      });
    } else {
      this.notInStockAlert = true;
    }
  }

  public removeItemFromCart(item: Cart): void {
    this.cartService.removeItemFromCart(item.id).subscribe(() => {
      this.cartService.allCartItems().subscribe((data: Cart[]) => {
        this.cartArr = data;
      });
      this.totalCartPrice -= (Number(item.quantity) * Number(item.product.mrp));
    }, error => {
      console.log('Error deleting item from cart', error);
    });
  }
}
