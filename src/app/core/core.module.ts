import { NgModule } from '@angular/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CartService } from './services/cart/cart.service';
import { CategoriesService } from './services/category/categories.service';
import { ProductService } from './services/product/product.service';

@NgModule({
  providers: [
    CartService,
    CategoriesService,
    ProductService,
    LoggingInterceptor,
  ],
})
export class CoreModule {}
