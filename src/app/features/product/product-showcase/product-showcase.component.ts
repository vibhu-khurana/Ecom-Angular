import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCT_CONSTANT } from 'src/app/core/constants/product.constant';
import { Cart } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/products.model';
import { CartService } from 'src/app/core/services/cart/cart.service';


@Component({
  selector: 'product-showcase',
  templateUrl: './product-showcase.component.html'
})
export class ProductShowcaseComponent implements OnInit {
  public product!: Product;
  public readonly CONSTANTS = PRODUCT_CONSTANT

  private cartItems?: Cart[];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly tocart: CartService) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });
  }
  public toCartScreen(): void {
    this.tocart.allCartItems().subscribe((items: Cart[]) => {
      this.cartItems = items;
      if (this.cartItems?.length === 0) {
        this.addToCart();
      }
      else {
        const fetchedItem = this.cartItems?.find((item: { product: { id: number } }) => {
          return (item.product.id === this.product.id);
        });

        if (fetchedItem !== undefined && fetchedItem !== null) {
          fetchedItem.quantity = (fetchedItem.quantity < fetchedItem.product.quantity)
            ? Number(fetchedItem.quantity) + Number('1') :
            fetchedItem.quantity;
          this.updateCart(fetchedItem);
        } else {
          this.addToCart();
        }
      }
    });
  }


  private addToCart(): void {
    this.tocart.addToCart(new Cart(this.product, 1, new Date())).subscribe(() => {
      this.router.navigateByUrl('/quick-order');
    }, (error: any) => {
      console.log('Error while adding item to Cart', error);
    });
  }

  private updateCart(cartItem: Cart): void {
    this.tocart.updateCartItem(cartItem).subscribe(() => {
      this.router.navigateByUrl('/quick-order');
    }, (error: any) => {
      console.log('Error while updating item in Cart', error);
    });
  }
}
