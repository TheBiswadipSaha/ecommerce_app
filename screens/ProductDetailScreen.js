// src/screens/ProductDetailScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { get } from '../api/api';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE } from '../config/constants';

export default function ProductDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    const response = await get(`/products/${id}`);
    if (response.success) {
      setProduct(response.data);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Item added to cart', [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('HomeTabs', { screen: 'Cart' }) }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Stock</Text>
          <Text style={styles.stock}>
            {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
          </Text>
        </View>
        
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        />
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.lg,
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 24,
  },
  stock: {
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
  }
};