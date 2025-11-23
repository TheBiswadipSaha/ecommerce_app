// screens/WishlistScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function WishlistScreen({ navigation }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const saved = JSON.parse(await AsyncStorage.getItem('@wishlist') || '[]');
    setWishlist(saved);
  };

  const removeFromWishlist = async (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    await AsyncStorage.setItem('@wishlist', JSON.stringify(updated));
    setWishlist(updated);
  };

  const WishlistItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromWishlist(item.id)} style={styles.removeBtn}>
        <Ionicons name="heart" size={24} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Wishlist" showBack onBackPress={() => navigation.goBack()} />
      
      {wishlist.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <WishlistItem item={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  image: { width: 70, height: 70, borderRadius: BORDER_RADIUS.md, marginRight: SPACING.md },
  details: { flex: 1 },
  name: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  price: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.primary },
  removeBtn: { padding: SPACING.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: FONT_SIZE.lg, color: COLORS.textLight, marginTop: SPACING.md },
});