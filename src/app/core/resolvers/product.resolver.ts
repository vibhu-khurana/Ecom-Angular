import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

  constructor(private readonly productService: ProductService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const productId = route.paramMap.get('productId');
    return this.productService.getProductById(productId !== null ? productId : '');
  }
}
