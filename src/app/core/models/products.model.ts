import { Category } from './category.model';

export class Product {
  id!: number;
  productName!: string;
  image!: string;
  productDesc!: string;
  mrp!: number;
  bestSeller!: boolean;
  category!: Category;
  quantity!: number;
  tags!: Array<string>;
}
