import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { ProductService } from '../services/product/product.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {

  constructor(private productService: ProductService) { }

  public resolve(): Observable<Product[]> {
    return this.productService.allProduct();
  }
}
