import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Product extends Model {
  static table = 'products';

  @field('title')
  title!: string;

  @field('description')
  description!: string;

  @field('price')
  price!: number;

  @field('thumbnail')
  thumbnail!: string;
}