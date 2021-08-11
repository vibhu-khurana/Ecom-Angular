import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from 'src/app/core/resolvers/products.resolver';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found.component';
import { ProductResolver } from '../core/resolvers/product.resolver';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { HomeComponent } from './home/home.component';
import { ProductGridComponent } from './product/product-grid/product-grid.component';
import { ProductShowcaseComponent } from './product/product-showcase/product-showcase.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: BestSellerComponent },
      {
        path: 'search',
        component: SearchComponent,
        resolve: { productList: ProductsResolver },
      },
      { path: 'shop', component: ProductGridComponent },
      {
        path: 'products/:productId',
        component: ProductShowcaseComponent,
        resolve: { product: ProductResolver },
      },
      {
        path: 'quick-order',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
  { path: '/', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
