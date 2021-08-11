import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Cart } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/products.model';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from '../../cart/cart.component';
import { ProductShowcaseComponent } from './product-showcase.component';

describe('ProductShowcase', () => {
  let component: ProductShowcaseComponent;
  let fixture: ComponentFixture<ProductShowcaseComponent>;
  let service: CartService;
  const product: Product =
  {
    "id": 3, "productName": "Men Reversible Bomber Jacket",
    "image": "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10646154/2019/11/27/d9ead1c6-cfb4-4313-9426-12e48d1da3121574859444519-Allen-Solly-Men-Mustard-Yellow--Black-Solid-Reversible-Bombe-1.jpg",
    "productDesc": "jacket",
    "mrp": 1529, "bestSeller": true,
    "category": { "id": 3, "categoryName": "Men", "subCategory": "Jacket" },
    "tags": [],
    "quantity": 12
  }
  const route = ({
    data: of({ product: product })
  } as any) as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'quick-order', component: CartComponent }
        ]),
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductShowcaseComponent],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ]
    });

    fixture = TestBed.createComponent(ProductShowcaseComponent);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get product detail entry', () => {
    component.ngOnInit();
    expect(component.product).toEqual(product);
  });

  it('should add product to cart', () => {
    const response: Cart[] = [];
    spyOn(service, 'allCartItems').and.returnValue(of(response))
    spyOn(service, 'addToCart').and.returnValue(of())
    component.toCartScreen();
    fixture.detectChanges();
    expect(component['cartItems']?.length).toEqual(0);
  });

});
