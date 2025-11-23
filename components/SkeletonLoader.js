import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../config/constants';

export const ProductCardSkeleton = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.info}>
        <Animated.View style={[styles.nameLine, { opacity }]} />
        <Animated.View style={[styles.priceLine, { opacity }]} />
      </View>
    </View>
  );
};

export const OrderCardSkeleton = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Animated.View style={[styles.orderIdLine, { opacity }]} />
          <Animated.View style={[styles.dateLine, { opacity }]} />
        </View>
        <Animated.View style={[styles.statusBadge, { opacity }]} />
      </View>
      <View style={styles.divider} />
      <Animated.View style={[styles.itemLine, { opacity }]} />
      <Animated.View style={[styles.itemLine, { opacity }]} />
      <View style={styles.totalRow}>
        <Animated.View style={[styles.totalLabelLine, { opacity }]} />
        <Animated.View style={[styles.totalAmountLine, { opacity }]} />
      </View>
    </View>
  );
};

export const ProductDetailSkeleton = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.detailContainer}>
      <Animated.View style={[styles.detailImage, { opacity }]} />
      <View style={styles.detailContent}>
        <Animated.View style={[styles.titleLine, { opacity }]} />
        <Animated.View style={[styles.priceLine, { opacity, width: 100 }]} />
        <View style={{ marginTop: SPACING.lg }}>
          <Animated.View style={[styles.line, { opacity, width: '100%' }]} />
          <Animated.View style={[styles.line, { opacity, width: '90%' }]} />
          <Animated.View style={[styles.line, { opacity, width: '95%' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.borderLight,
  },
  info: {
    padding: SPACING.md,
  },
  nameLine: {
    height: 16,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
    width: '80%',
  },
  priceLine: {
    height: 20,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    width: 80,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderIdLine: {
    height: 16,
    width: 120,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  dateLine: {
    height: 14,
    width: 80,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusBadge: {
    height: 28,
    width: 90,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  itemLine: {
    height: 14,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
    width: '70%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  totalLabelLine: {
    height: 16,
    width: 60,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
  },
  totalAmountLine: {
    height: 20,
    width: 100,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  detailImage: {
    width: '100%',
    height: 400,
    backgroundColor: COLORS.borderLight,
  },
  detailContent: {
    padding: SPACING.xl,
  },
  titleLine: {
    height: 24,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
    width: '90%',
  },
  line: {
    height: 14,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
});