// src/screens/CheckoutScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { post } from '../api/api';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE } from '../config/constants';

export default function CheckoutScreen({ navigation }) {
  const { cart, getCartTotal, clearCart, user } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter delivery address');
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user?.id || 'u123',
      items: cart.map(item => ({
        productId: item.productId,
        qty: item.qty
      })),
      total: getCartTotal(),
      address
    };

    const response = await post('/orders/create', orderData);
    setLoading(false);

    if (response.success) {
      clearCart();
      Alert.alert('Success', 'Order placed successfully!', [
        { text: 'OK', onPress: () => navigation.replace('HomeTabs', { screen: 'Orders' }) }
      ]);
    } else {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cart.map((item) => (
          <View key={item.productId} style={styles.orderItem}>
            <Text style={styles.itemName}>
              {item.name} x {item.qty}
            </Text>
            <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
          </View>
        ))}
        
        <View style={styles.divider} />
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{getCartTotal()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  itemName: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  }
};