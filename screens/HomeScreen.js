import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { get } from '../api/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { COLORS, SPACING } from '../config/constants';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const response = await get('/products');
    if (response.success) {
      setProducts(response.data || []);
    }
    setLoading(false);
  };

  const renderSkeletons = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonWrapper}>
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Shop" 
        subtitle="Discover amazing products"
        showCart={true}
        showProfile={true}
        onCartPress={() => navigation.navigate('Cart')}
        onProfilePress={() => navigation.navigate('Profile')}
      />

      {loading ? (
        renderSkeletons()
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.md,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  skeletonWrapper: {
    width: '48%',
    marginBottom: SPACING.md,
  },
});