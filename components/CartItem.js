// src/components/CartItem.js
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE } from '../config/constants';

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
          >
            <Ionicons name="remove" size={20} color={COLORS.text} />
          </TouchableOpacity>
          
          <Text style={styles.qty}>{item.qty}</Text>
          
          <TouchableOpacity 
            onPress={() => onUpdateQty(item.productId, item.qty + 1)}
            style={styles.qtyButton}
          >
            <Ionicons name="add" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => onRemove(item.productId)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={24} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    marginHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  removeButton: {
    justifyContent: 'center',
    paddingLeft: SPACING.sm,
  }
};