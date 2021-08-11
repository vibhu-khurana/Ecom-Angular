import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FeaturesRoutingModule } from "../features-routing.module";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductShowcaseComponent } from "./product-showcase/product-showcase.component";

@NgModule({
  declarations: [ProductGridComponent, ProductShowcaseComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule
  ],
  exports: [ProductGridComponent, ProductShowcaseComponent]
})
export class ProductModule { }