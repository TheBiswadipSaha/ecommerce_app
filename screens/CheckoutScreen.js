import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function CheckoutScreen({ navigation, route }) {
  const { cart, getCartTotal, clearCart, user, addOrder } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    loadSavedAddresses();
    if (route.params?.selectedAddress) {
      setAddress(route.params.selectedAddress);
    }
  }, [route.params?.selectedAddress]);

  const loadSavedAddresses = async () => {
    const saved = JSON.parse(await AsyncStorage.getItem('@addresses') || '[]');
    setSavedAddresses(saved);
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter or select delivery address');
      return;
    }

    setLoading(true);

    // Save address if it's new
    const addressExists = savedAddresses.some(a => a.address === address.trim());
    if (!addressExists && address.trim()) {
      const newAddress = {
        id: Date.now().toString(),
        label: 'Delivery Address',
        address: address.trim()
      };
      const updated = [...savedAddresses, newAddress];
      await AsyncStorage.setItem('@addresses', JSON.stringify(updated));
    }

    const order = {
      orderId: `ORD${Date.now()}`,
      userId: user?.id || 'guest',
      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      total: getCartTotal(),
      address: address.trim(),
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Processing',
    };

    await addOrder(order);
    await clearCart();
    
    setLoading(false);

    Alert.alert(
      'Order Placed Successfully!', 
      `Your order #${order.orderId} has been placed and will be delivered soon.`,
      [
        { 
          text: 'View Orders', 
          onPress: () => navigation.replace('HomeTabs', { screen: 'Orders' }) 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Checkout" showBack onBackPress={() => navigation.goBack()} />
      
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            {savedAddresses.length > 0 && (
              <TouchableOpacity 
                onPress={() => navigation.navigate('SavedAddresses', { selectMode: true })}
              >
                <Text style={styles.selectLink}>Select Saved</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Enter complete delivery address with pincode"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={4}
            placeholderTextColor={COLORS.textMuted}
          />
          
          <TouchableOpacity 
            style={styles.manageBtn}
            onPress={() => navigation.navigate('SavedAddresses')}
          >
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <Text style={styles.manageBtnText}>Manage Saved Addresses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item) => (
            <View key={item.productId} style={styles.orderItem}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name} × {item.qty}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{getCartTotal()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={styles.freeText}>Free</Text>
          </View>
          
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  section: { padding: SPACING.lg, backgroundColor: COLORS.white, marginBottom: SPACING.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text },
  selectLink: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.primary },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  manageBtnText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.primary },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  itemName: { fontSize: FONT_SIZE.md, color: COLORS.text, flex: 1, marginRight: SPACING.md },
  itemPrice: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.xs },
  summaryLabel: { fontSize: FONT_SIZE.md, color: COLORS.textLight },
  summaryValue: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text },
  freeText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.success },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text },
  totalAmount: { fontSize: 28, fontWeight: '700', color: COLORS.primary },
});