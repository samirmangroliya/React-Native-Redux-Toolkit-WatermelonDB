import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,

  tables: [
    tableSchema({
      name: 'products',

      columns: [
        { name: 'product_id', type: 'number' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'discount_percentage', type: 'number' },
        { name: 'rating', type: 'number' },
        { name: 'stock', type: 'number' },
        { name: 'tags', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'sku', type: 'string' },
        { name: 'weight', type: 'number' },
        { name: 'thumbnail', type: 'string' },
      ],
    }),
  ],
});