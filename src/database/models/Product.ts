import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';

  @field('product_id')
  productId!: number;

  @field('title')
  title!: string;

  @field('description')
  description!: string;

  @field('category')
  category!: string;

  @field('price')
  price!: number;

  @field('discount_percentage')
  discountPercentage!: number;

  @field('rating')
  rating!: number;

  @field('stock')
  stock!: number;

  @field('tags')
  tags!: string;

  @field('brand')
  brand!: string;

  @field('sku')
  sku!: string;

  @field('weight')
  weight!: number;

  @field('thumbnail')
  thumbnail!: string;
}