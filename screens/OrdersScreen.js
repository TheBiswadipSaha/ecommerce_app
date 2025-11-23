import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

function OrderCard({ order, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderId}>Order #{order.orderId}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status || 'Processing'}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.items}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemDot} />
            <Text style={styles.itemText}>
              {item.name} × {item.qty}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>₹{order.total}</Text>
      </View>
      
      <View style={styles.viewDetails}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

export default function OrdersScreen({ navigation }) {
  const { orders, user } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="My Orders" subtitle={user ? `Hi, ${user.name}` : 'Guest'} />

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="receipt-outline" size={80} color={COLORS.border} />
          </View>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyText}>Start shopping to see your orders here</Text>
          <Button
            title="Start Shopping"
            onPress={() => navigation.navigate('Home')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderCard 
              order={item} 
              onPress={() => navigation.navigate('OrderDetail', { order: item })} 
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  emptyIcon: { marginBottom: SPACING.lg },
  emptyTitle: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  emptyText: { fontSize: FONT_SIZE.md, color: COLORS.textLight, marginBottom: SPACING.xl, textAlign: 'center' },
  emptyButton: { minWidth: 200 },
  card: { backgroundColor: COLORS.white, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.md, ...SHADOW.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flex: 1 },
  orderId: { fontSize: FONT_SIZE.md, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.xs },
  date: { fontSize: FONT_SIZE.sm, color: COLORS.textLight },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.md },
  statusText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.success },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  items: { marginBottom: SPACING.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  itemDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: SPACING.sm },
  itemText: { fontSize: FONT_SIZE.sm, color: COLORS.text, flex: 1 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  totalLabel: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.textLight },
  totalAmount: { fontSize: FONT_SIZE.lg, fontWeight: '700', color: COLORS.primary },
  viewDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  viewDetailsText: { fontSize: FONT_SIZE.sm, fontWeight: '600', color: COLORS.primary, marginRight: SPACING.xs },
});