// screens/OrderDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

const ORDER_STEPS = [
  { label: 'Order Placed', status: 'Placed' },
  { label: 'Processing', status: 'Processing' },
  { label: 'Shipped', status: 'Shipped' },
  { label: 'Out for Delivery', status: 'Out for Delivery' },
  { label: 'Delivered', status: 'Delivered' },
];

export default function OrderDetailScreen({ route, navigation }) {
  const { order } = route.params;
  const currentStep = ORDER_STEPS.findIndex(s => s.status === order.status);

  const StepItem = ({ step, index }) => {
    const isCompleted = index <= currentStep;
    const isLast = index === ORDER_STEPS.length - 1;

    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepLeft}>
          <View style={[styles.stepBox, isCompleted && styles.stepBoxCompleted]}>
            {isCompleted && <Ionicons name="checkmark" size={20} color={COLORS.white} />}
          </View>
          {!isLast && <View style={[styles.stepLine, isCompleted && styles.stepLineCompleted]} />}
        </View>
        <Text style={[styles.stepLabel, isCompleted && styles.stepLabelCompleted]}>{step.label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Order Details" showBack onBackPress={() => navigation.goBack()} />
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.orderId}>Order #{order.orderId}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.steps}>
            {ORDER_STEPS.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Qty: {item.qty}</Text>
              <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.address}>{order.address}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{order.total}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  card: { 
    backgroundColor: COLORS.white, 
    margin: SPACING.md, 
    padding: SPACING.lg, 
    borderRadius: BORDER_RADIUS.lg, 
    ...SHADOW.sm 
  },
  orderId: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.text },
  date: { fontSize: FONT_SIZE.sm, color: COLORS.textLight, marginTop: SPACING.xs },
  sectionTitle: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  steps: { paddingVertical: SPACING.sm },
  stepContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.md },
  stepLeft: { alignItems: 'center', marginRight: SPACING.md },
  stepBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBoxCompleted: { backgroundColor: COLORS.success },
  stepLine: { 
    width: 2, 
    height: 40, 
    backgroundColor: COLORS.borderLight, 
    marginTop: 4 
  },
  stepLineCompleted: { backgroundColor: COLORS.success },
  stepLabel: { fontSize: FONT_SIZE.md, color: COLORS.textLight, paddingTop: 6 },
  stepLabelCompleted: { color: COLORS.text, fontWeight: '600' },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  itemName: { flex: 1, fontSize: FONT_SIZE.md, color: COLORS.text },
  itemQty: { fontSize: FONT_SIZE.sm, color: COLORS.textLight, marginHorizontal: SPACING.md },
  itemPrice: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text },
  address: { fontSize: FONT_SIZE.md, color: COLORS.text, lineHeight: 22 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: FONT_SIZE.lg, fontWeight: '600', color: COLORS.textLight },
  totalAmount: { fontSize: FONT_SIZE.xxl, fontWeight: '700', color: COLORS.primary },
});