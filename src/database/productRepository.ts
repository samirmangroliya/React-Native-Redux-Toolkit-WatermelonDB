import {Q} from '@nozbe/watermelondb';

import {database} from './database';
import Product from './models/Product';

import type {Product as ApiProduct} from '../store/product/productSlice';

export async function saveProducts(
  products: ApiProduct[],
): Promise<void> {
  await database.write(async () => {
    const collection = database.get<Product>('products');

    const operations = [];

    for (const product of products) {
      const existingProducts = await collection
        .query(Q.where('product_id', product.id))
        .fetch();

      const existingProduct = existingProducts[0];

      if (existingProduct) {
        operations.push(
          existingProduct.prepareUpdate(record => {
            record.title = product.title;
            record.description = product.description;
            record.category = product.category;
            record.price = product.price;
            record.discountPercentage = product.discountPercentage;
            record.rating = product.rating;
            record.stock = product.stock;
            record.tags = JSON.stringify(product.tags);
            record.brand = product.brand;
            record.sku = product.sku;
            record.weight = product.weight;
            record.thumbnail = product.thumbnail;
          }),
        );
      } else {
        operations.push(
          collection.prepareCreate(record => {
            record.productId = product.id;
            record.title = product.title;
            record.description = product.description;
            record.category = product.category;
            record.price = product.price;
            record.discountPercentage = product.discountPercentage;
            record.rating = product.rating;
            record.stock = product.stock;
            record.tags = JSON.stringify(product.tags);
            record.brand = product.brand;
            record.sku = product.sku;
            record.weight = product.weight;
            record.thumbnail = product.thumbnail;
          }),
        );
      }
    }

    await database.batch(...operations);
  });
}

export async function getProducts(): Promise<Product[]> {
  return database.get<Product>('products').query().fetch();
}

export async function getProductById(
  productId: number,
): Promise<Product | null> {
  const products = await database
    .get<Product>('products')
    .query(Q.where('product_id', productId))
    .fetch();

  return products[0] ?? null;
}

export function mapDatabaseProduct(
  product: Product,
): ApiProduct {
  return {
    id: product.productId,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    tags: JSON.parse(product.tags) as string[],
    brand: product.brand,
    sku: product.sku,
    weight: product.weight,
    thumbnail: product.thumbnail,
  };
}