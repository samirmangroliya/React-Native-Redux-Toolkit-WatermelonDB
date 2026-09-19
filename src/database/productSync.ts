import {fetchProductsFromApi} from '../api/productApi';
import {saveProducts} from './productRepository';

export async function syncProducts(): Promise<void> {
  const products = await fetchProductsFromApi();

  await saveProducts(products);
}