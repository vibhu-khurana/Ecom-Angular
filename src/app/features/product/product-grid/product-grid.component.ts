import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import { PRODUCT_CONSTANT } from "src/app/core/constants/product.constant";
import { Product } from "src/app/core/models/products.model";
import { GetProducts } from "../actions/product.action";
import { ProductState } from "../state/product.state";

@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  @Input() type?: string;
  @Input() search?: boolean;

  public screeenProducts?: Product[];
  public count: number = 0;
  public cols: number = 3;
  public paramsObject: any;
  public readonly CONSTANTS = PRODUCT_CONSTANT

  private products!: Product[];
  private gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 1.5,
    sm: 1,
    xs: 1
  };

  @Select(ProductState.getProductList)
  products$!: Observable<Product[]>;

  @Select(ProductState.getProductLoaded)
  isProductLoaded$!: Observable<boolean>;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly store: Store, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe(result => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
          console.log(this.cols);
        }
      });
  }

  public ngOnInit(): void {
    this.getAllProducts();
  }

  public viewProduct(id: any): void {
    this.router.navigateByUrl('products/' + id);
  }

  public homePageRoute(): void {
    this.router.navigateByUrl('');
  }

  public categoryRoute(): void {
    this.router.navigateByUrl('/shop?categoryName=' + this.paramsObject.params.categoryName);
  }

  private getAllProducts(): void {
    this.store.dispatch(new GetProducts()).pipe(withLatestFrom(this.products$)).subscribe(([resp]) => {
      this.products = resp.products.products
      if (this.type && this.type === 'bestselling') {
        this.getBestSellingProducts();
      }
      this.checkForFilters();
      if (this.search) {
        this.checkForSearchQuery();
      }
    });
  }

  private getBestSellingProducts(): void {
    this.screeenProducts = this.products.filter(eachProd => eachProd.bestSeller === true);
    this.count = this.screeenProducts.length;
  }

  private checkForFilters(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.categoryName !== undefined && this.paramsObject.params.subCategory === undefined) {
        this.getProductsByCategory(this.paramsObject.params.categoryName);
      } else if (this.paramsObject.params.categoryName !== undefined && this.paramsObject.params.subCategory !== undefined) {
        this.getProductsBySubCategory(this.paramsObject.params.categoryName, this.paramsObject.params.subCategory);
      } else if (this.paramsObject.params.search_query === undefined &&
        this.paramsObject.params.categoryName === undefined && this.paramsObject.params.subCategory === undefined) {
        this.router.navigateByUrl('/');
      }
    }
    );
  }

  private getProductsByCategory(categoryName: string): void {
    this.screeenProducts = this.products.filter(eachProd => eachProd.category.categoryName === categoryName);
    this.count = this.screeenProducts.length;
  }

  getProductsBySubCategory(categoryName: string, subCategory: string): void {
    this.screeenProducts = this.products.filter(eachProd => (eachProd.category.categoryName === categoryName &&
      eachProd.category.subCategory === subCategory));
    this.count = this.screeenProducts.length;
  }

  private checkForSearchQuery(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.search_query !== undefined && this.paramsObject.params.search_query !== 'undefined' &&
        this.paramsObject.params.search_query !== '') {
        this.search = true;
        this.screeenProducts = this.products.filter(elem => elem.productName.toLocaleLowerCase().trim().includes(this.paramsObject.params.search_query.toLocaleLowerCase().trim()));
        this.count = this.screeenProducts.length;
      }
    });
  }
}