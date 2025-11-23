import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import Header from '../components/Header';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const { cart, updateCartQty, removeFromCart, getCartTotal } = useContext(AppContext);

  useEffect(() => {
    const showAsyncStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log('All Keys:', keys);

        const allData = await AsyncStorage.multiGet(keys);
        console.log('All AsyncStorage Data:');

        allData.forEach(([key, value]) => {
          console.log(`Key: ${key}`);
          console.log(`Value: ${value}`);
          console.log('---');
        });

        // Or format it as an object for easier viewing
        const dataObject = {};
        allData.forEach(([key, value]) => {
          try {
            dataObject[key] = JSON.parse(value);
          } catch (e) {
            dataObject[key] = value;
          }
        });
        console.log('Full AsyncStorage Object:', JSON.stringify(dataObject, null, 2));

      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      }
    };

    showAsyncStorage();
  }, []);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Cart" />
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cart-outline" size={80} color={COLORS.border} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add some products to get started</Text>
          <Button
            title="Start Shopping"
            onPress={() => navigation.navigate('Home')}
            style={styles.emptyButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Cart"
        subtitle={`${cart.length} ${cart.length === 1 ? 'item' : 'items'}`}
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQty={updateCartQty}
            onRemove={removeFromCart}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>₹{getCartTotal()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.freeText}>Free</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalAmount}>₹{getCartTotal()}</Text>
          </View>
        </View>
        <Button
          title="Proceed to Checkout"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  emptyButton: {
    minWidth: 200,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  totalSection: {
    marginBottom: SPACING.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
  },
  totalValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  freeText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  grandTotalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  grandTotalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
});