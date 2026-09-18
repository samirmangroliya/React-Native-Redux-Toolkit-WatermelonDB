import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,

  tables: [
    tableSchema({
      name: 'products',

      columns: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'thumbnail',
          type: 'string',
        },
      ],
    }),   
  ],
});