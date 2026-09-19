import type {Product} from '../store/product/productSlice';

interface ProductApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProductsFromApi(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data: ProductApiResponse = await response.json();

  return data.products;
}