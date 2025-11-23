// screens/SavedAddressesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function SavedAddressesScreen({ navigation, route }) {
  const [addresses, setAddresses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const { selectMode } = route.params || {};

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const saved = JSON.parse(await AsyncStorage.getItem('@addresses') || '[]');
    setAddresses(saved);
  };

  const addAddress = async () => {
    if (!newAddress.label.trim() || !newAddress.address.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const address = { ...newAddress, id: Date.now().toString() };
    const updated = [...addresses, address];
    await AsyncStorage.setItem('@addresses', JSON.stringify(updated));
    setAddresses(updated);
    setNewAddress({ label: '', address: '' });
    setModalVisible(false);
  };

  const deleteAddress = async (id) => {
    Alert.alert('Delete Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = addresses.filter(a => a.id !== id);
          await AsyncStorage.setItem('@addresses', JSON.stringify(updated));
          setAddresses(updated);
        }
      }
    ]);
  };

  const selectAddress = (address) => {
    if (selectMode) {
      navigation.navigate('Checkout', { selectedAddress: address.address });
    }
  };

  const AddressCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => selectAddress(item)}
      activeOpacity={selectMode ? 0.7 : 1}
    >
      <View style={styles.cardContent}>
        <Text style={styles.addressTitle}>{item.label}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteAddress(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title={selectMode ? 'Select Address' : 'Saved Addresses'} 
        showBack 
        onBackPress={() => navigation.goBack()} 
      />
      
      {addresses.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="location-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.emptyText}>No saved addresses</Text>
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <AddressCard item={item} />}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.footer}>
        <Button title="Add New Address" onPress={() => setModalVisible(true)} />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Label (e.g., Home, Office)"
              value={newAddress.label}
              onChangeText={(text) => setNewAddress({ ...newAddress, label: text })}
              placeholderTextColor={COLORS.textLight}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Complete address"
              value={newAddress.address}
              onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
              multiline
              numberOfLines={4}
              placeholderTextColor={COLORS.textLight}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={addAddress}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  cardContent: { flex: 1 },
  addressTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  addressText: { fontSize: FONT_SIZE.sm, color: COLORS.textLight, lineHeight: 20 },
  deleteBtn: { padding: SPACING.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: FONT_SIZE.lg, color: COLORS.textLight, marginTop: SPACING.md },
  footer: { padding: SPACING.lg, backgroundColor: COLORS.white, ...SHADOW.md },
  modalOverlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: BORDER_RADIUS.xl, borderTopRightRadius: BORDER_RADIUS.xl, padding: SPACING.xl },
  modalTitle: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.lg },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.md },
  modalBtn: { flex: 1, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, alignItems: 'center' },
  cancelBtn: { backgroundColor: COLORS.borderLight },
  saveBtn: { backgroundColor: COLORS.primary },
  cancelText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text },
  saveText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.white },
});