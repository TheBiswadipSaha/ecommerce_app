// screens/HelpSupportScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '../config/constants';

export default function HelpSupportScreen({ navigation }) {
  const openGithub = () => {
    Linking.openURL('https://github.com/TheBiswadipSaha/issues');
  };

  const HelpItem = ({ icon, title, description, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Help & Support" showBack onBackPress={() => navigation.goBack()} />
      
      <ScrollView style={styles.content}>
        {/* Developer Info */}
        <View style={styles.devCard}>
          <View style={styles.devAvatar}>
            <Text style={styles.devAvatarText}>BS</Text>
          </View>
          <Text style={styles.devName}>Biswadip Saha</Text>
          <Text style={styles.devTitle}>Developer</Text>
          <TouchableOpacity style={styles.githubBtn} onPress={openGithub} activeOpacity={0.7}>
            <Ionicons name="logo-github" size={20} color={COLORS.white} />
            <Text style={styles.githubText}>Report Issue on GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Help Items */}
        <View style={styles.card}>
          <HelpItem
            icon="chatbubble-outline"
            title="FAQs"
            description="Find answers to common questions"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <HelpItem
            icon="mail-outline"
            title="Contact Us"
            description="Get in touch with our team"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <HelpItem
            icon="document-text-outline"
            title="Terms & Privacy"
            description="Read our policies"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  devCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    ...SHADOW.md,
  },
  devAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  devAvatarText: { fontSize: FONT_SIZE.xxl, fontWeight: '700', color: COLORS.white },
  devName: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  devTitle: { fontSize: FONT_SIZE.md, color: COLORS.textLight, marginBottom: SPACING.lg },
  githubBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  githubText: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.white },
  card: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOW.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: FONT_SIZE.md, fontWeight: '600', color: COLORS.text, marginBottom: 2 },
  itemDesc: { fontSize: FONT_SIZE.sm, color: COLORS.textLight },
  separator: { height: 1, backgroundColor: COLORS.borderLight, marginHorizontal: SPACING.lg },
  version: { textAlign: 'center', fontSize: FONT_SIZE.sm, color: COLORS.textLight, padding: SPACING.xl },
});