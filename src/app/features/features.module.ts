import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './product/product.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BestSellerComponent,
    SearchComponent,
  ],
  imports: [CommonModule, FeaturesRoutingModule, SharedModule, ProductModule],
})
export class FeaturesModule {}
