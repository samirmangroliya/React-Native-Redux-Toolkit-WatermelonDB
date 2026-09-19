import React, { useEffect } from 'react';
import { database } from './src/database/database';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { syncProducts } from './src/database/productSync';
import { getProducts } from './src/database/productRepository';

export default function App() {
  console.log('WatermelonDB Initialized:', database);

  useEffect(() => {
    async function sync() {
      try {
        await syncProducts();

        console.log('PRODUCT SYNC SUCCESS');

        const products = await getProducts(); 
        console.log('DB PRODUCT COUNT:', products.length);
      } catch (error) {
        console.error('PRODUCT SYNC FAILED:', error);
      }
    }

    sync();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}