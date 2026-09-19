import React, { useEffect, useState } from 'react';

import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector } from '../store/hooks';
import { getProductById, mapDatabaseProduct } from '../database/productRepository';
import type { Product } from '../store/product/productSlice';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'ProductDetails'
>;

export default function ProductDetailsScreen({
    route,
}: Props) {
    const { productId } = route.params;

    const product = useAppSelector(state =>
        state.products.products.find(
            item => item.id === productId,
        ),
    );

    const [databaseProduct, setDatabaseProduct] =
        useState<Product | null>(null);

    useEffect(() => {
        if (product) {
            return;
        }

        getProductById(productId)
            .then(databaseProduct => {
                if (databaseProduct) {
                    setDatabaseProduct(mapDatabaseProduct(databaseProduct));
                }
            })
            .catch(error => {
                console.error('Failed to load product from database:', error);
            });
    }, [product, productId]);

    const displayedProduct = product ?? databaseProduct;

    if (!displayedProduct) {
        return (
            <View style={styles.center}>
                <Text style={styles.notFound}>
                    Product not found
                </Text>
            </View>
        );
    }

    const handleAddToCart = () => {
        console.log(
            'Add to cart:',
            displayedProduct.id,
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{
                        uri: displayedProduct.thumbnail,
                    }}
                    style={styles.productImage}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        {displayedProduct.title}
                    </Text>

                    <Text style={styles.price}>
                        ${displayedProduct.price}
                    </Text>

                    <Text style={styles.descriptionTitle}>
                        Description
                    </Text>

                    <Text style={styles.description}>
                        {displayedProduct.description}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <Pressable
                    onPress={handleAddToCart}
                    style={({ pressed }) => [
                        styles.addToCartButton,
                        pressed && styles.addToCartButtonPressed,
                    ]}
                >
                    <Text style={styles.addToCartText}>
                        Add to Cart
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 120,
    },

    productImage: {
        width: '100%',
        height: 320,
        backgroundColor: '#f5f5f5',
    },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 12,
    },

    price: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 24,
    },

    descriptionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
    },

    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },

    addToCartButton: {
        height: 52,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },

    addToCartText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
    },
    addToCartButtonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    notFound: {
        fontSize: 18,
    },
});