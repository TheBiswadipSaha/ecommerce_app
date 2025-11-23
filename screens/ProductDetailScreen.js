import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { get } from '../api/api';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../config/constants';

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
    Alert.alert(
      'Added to Cart', 
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('HomeTabs', { screen: 'Cart' }) }
      ]
    );
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
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
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.stockRow}>
            <View style={[
              styles.stockDot, 
              { backgroundColor: product.stock > 0 ? COLORS.success : COLORS.error }
            ]} />
            <Text style={[
              styles.stock,
              { color: product.stock > 0 ? COLORS.success : COLORS.error }
            ]}>
              {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
            </Text>
          </View>
        </View>
        
        <Button
          title={product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textLight,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.xl,
  },
  name: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 34,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 24,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  stock: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  button: {
    marginTop: SPACING.md,
  },
});