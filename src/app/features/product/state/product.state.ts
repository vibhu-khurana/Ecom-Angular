import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Product } from "src/app/core/models/products.model";
import { ProductService } from "src/app/core/services/product/product.service";
import { GetProducts } from "../actions/product.action";

export class ProductStateModel {
  products: Product[] = [];
  productLoaded: boolean = false
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    productLoaded: false
  }
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) { }

  @Selector()
  static getProductList(state: ProductStateModel) {
    return state.products;
  }
  @Selector()
  static getProductLoaded(state: ProductStateModel) {
    return state.productLoaded;
  }

  @Action(GetProducts)
  getProducts({ getState, setState }: StateContext<ProductStateModel>) {
    return this.productService.allProduct().pipe(tap(resp => {
      const state = getState();
      setState({
        ...state,
        products: resp,
        productLoaded: true
      });
    }))
  }

}
