import { Product } from './products.model';

export class Cart {
  product: Product;
  quantity: number;
  id!: number;
  orderPlacedOn: Date;

  constructor(product: Product, quantity: number, orderPlacedOn: Date) {
    this.product = product;
    this.quantity = quantity;
    this.orderPlacedOn = orderPlacedOn;
  }
}
