import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>
        
        <View style={styles.qtyRow}>
          <TouchableOpacity 
            onPress={() => onUpdateQty(item.productId, item.qty - 1)}
            style={styles.qtyButton}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={18} color={COLORS.text} />
          </TouchableOpacity>
          
          <Text style={styles.qty}>{item.qty}</Text>
          
          <TouchableOpacity 
            onPress={() => onUpdateQty(item.productId, item.qty + 1)}
            style={styles.qtyButton}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => onRemove(item.productId)}
        style={styles.removeButton}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={22} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: BORDER_RADIUS.md,
  },
  details: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    marginHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    justifyContent: 'center',
    paddingLeft: SPACING.sm,
  },
});