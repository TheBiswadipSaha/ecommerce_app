import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function ProfileScreen({ navigation }) {
  const { user, logout, orders, cart } = useContext(AppContext);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const total = orders.reduce((sum, order) => sum + order.total, 0);
    setTotalSpent(total);
  }, [orders]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const ProfileItem = ({ icon, label, value, onPress, showArrow = true }) => (
    <TouchableOpacity 
      style={styles.profileItem} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.profileItemText}>
          <Text style={styles.profileLabel}>{label}</Text>
          {value && <Text style={styles.profileValue}>{value}</Text>}
        </View>
      </View>
      {showArrow && onPress && (
        <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Profile" subtitle={user ? user.name : 'Guest'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
              </Text>
            </View>
          </View>
          <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'guest@example.com'}</Text>
        </View>

        {/* Stats Cards - Redesigned */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconCircle, { backgroundColor: COLORS.primary + '15' }]}>
              <Ionicons name="cart" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{cart.length}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconCircle, { backgroundColor: COLORS.secondary + '15' }]}>
              <Ionicons name="receipt" size={24} color={COLORS.secondary} />
            </View>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: COLORS.warning + '15' }]}>
              <Ionicons name="wallet" size={24} color={COLORS.warning} />
            </View>
            <Text style={styles.statNumber}>₹{totalSpent}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <ProfileItem
              icon="person-outline"
              label="Personal Information"
              value="Update your details"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <View style={styles.separator} />
            <ProfileItem
              icon="mail-outline"
              label="Email"
              value={user?.email}
              showArrow={false}
            />
            <View style={styles.separator} />
            <ProfileItem
              icon="lock-closed-outline"
              label="Change Password"
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>
        </View>

        {/* Shopping Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping</Text>
          <View style={styles.card}>
            <ProfileItem
              icon="location-outline"
              label="Saved Addresses"
              onPress={() => navigation.navigate('SavedAddresses')}
            />
            <View style={styles.separator} />
            <ProfileItem
              icon="receipt-outline"
              label="Order History"
              value={`${orders.length} orders`}
              onPress={() => navigation.navigate('Orders')}
            />
            <View style={styles.separator} />
            <ProfileItem
              icon="heart-outline"
              label="Wishlist"
              onPress={() => navigation.navigate('Wishlist')}
            />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            {/* <ProfileItem
              icon="notifications-outline"
              label="Notifications"
              onPress={() => navigation.navigate('NotificationSettings')}
            /> */}
            <View style={styles.separator} />
            <ProfileItem
              icon="help-circle-outline"
              label="Help & Support"
              onPress={() => navigation.navigate('HelpSupport')}
            />
            <View style={styles.separator} />
            <ProfileItem
              icon="information-circle-outline"
              label="About"
              onPress={() => Alert.alert('E-Commerce App', 'Version 1.0.0\n\nBuilt with React Native & Expo')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
          />
        </View>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOW.sm,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.md,
  },
  avatarText: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '700',
    color: COLORS.white,
  },
  profileName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    ...SHADOW.sm,
  },
  statIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  statNumber: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOW.sm,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  profileItemText: {
    flex: 1,
  },
  profileLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  profileValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textLight,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.lg,
  },
  logoutSection: {
    padding: SPACING.lg,
  },
});