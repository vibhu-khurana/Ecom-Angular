import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html'
})

export class BestSellerComponent implements OnInit {
  public slides: any;

  constructor() { }

  public ngOnInit(): void {
    this.slides = [
      { image: '../../../../assets/carousel/sale.jpg' },
      { image: '../../../../assets/carousel/shop.jpg' },
      { image: '../../../../assets/carousel/cloth.jpg' }
    ];
  }

}
