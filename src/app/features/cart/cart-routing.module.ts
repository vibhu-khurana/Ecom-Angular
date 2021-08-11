import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartResolver } from 'src/app/core/resolvers/cart.resolver';
import { CartComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartComponent, resolve: { cartList: CartResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
  constructor() {
  }
}
