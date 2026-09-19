import React, { useEffect } from 'react';

import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { syncAndLoadProducts } from '../store/product/productSlice';

import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Products'
>;



export default function ProductScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();

    const { products, loading, error, isOffline } =
        useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(syncAndLoadProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />

                <Text style={styles.message}>
                    Loading products...
                </Text>
            </View>
        );
    }

    if (!loading && isOffline && products.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyTitle}>
                    No cached products available
                </Text>

                <Text style={styles.emptyMessage}>
                    Connect to the internet and try again.
                </Text>

                <Pressable
                    onPress={() => dispatch(syncAndLoadProducts())}
                    style={styles.retryButton}
                >
                    <Text style={styles.retryText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>
                    {error}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {isOffline && (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineText}>
                        You're offline • Showing cached products
                    </Text>
                </View>
            )}
            {products.slice(0, 50).map(product => (
                <Pressable
                    key={product.id}
                    onPress={() =>
                        navigation.navigate('ProductDetails', {
                            productId: product.id,
                        })
                    }
                    style={({ pressed }) => [
                        styles.product,
                        pressed && styles.productPressed,
                    ]}
                >
                    <Image
                        source={{
                            uri: product.thumbnail,
                        }}
                        style={styles.productImage}
                        resizeMode="cover"
                    />

                    <View style={styles.productInfo}>
                        <Text
                            style={styles.title}
                            numberOfLines={2}
                        >
                            {product.title}
                        </Text>

                        <Text style={styles.price}>
                            ${product.price}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    product: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 8,
    },

    productImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },

    productInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },

    productPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.99 }],
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },

    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    message: {
        marginTop: 12,
        fontSize: 16,
    },

    offlineBanner: {
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#fff3cd',
    },

    offlineText: {
        fontSize: 14,
        textAlign: 'center',
    },

    error: {
        fontSize: 16,
        textAlign: 'center',
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },

    emptyMessage: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
    },

    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#000',
    },

    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});