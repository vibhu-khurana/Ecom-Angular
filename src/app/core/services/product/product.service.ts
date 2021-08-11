import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../../models/products.model";
import { ApiService } from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productUrl = environment.backendApi + '/products/';

  constructor(private apiService: ApiService) { }

  public allProduct(): Observable<Product[]> {
    return this.apiService.get(this.productUrl);
  }

  public getProductById(id: string): Observable<Product> {
    return this.apiService.get(this.productUrl + id);
  }

  public updateProduct(product: any): Observable<Product> {
    return this.apiService.put(this.productUrl + '/' + product.id, product);
  }
}
