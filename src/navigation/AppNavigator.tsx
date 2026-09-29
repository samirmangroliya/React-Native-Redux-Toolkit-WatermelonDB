import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductScreen from '../screens/ProductScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: {
    productId: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductScreen}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
}