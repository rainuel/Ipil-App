import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function AboutScreen() {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const openEmail = () => Linking.openURL('mailto:rainuelm@gmail.com');

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Header onDrawerPress={() => setShowDrawer(true)} />

      {/* Drawer Menu */}
      {showDrawer && <Menu onClose={() => setShowDrawer(false)} />}

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="bus-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.appName}>Ipil Today!</Text>
          <Text style={styles.tagline}>Getting around made simple.</Text>
          <View style={styles.metaRow}>
            <Ionicons name="pricetag-outline" size={16} color="#fff" />
            <Text style={styles.metaText}> v1.0.0 • August 2025</Text>
          </View>
        </View>

        {/* Mission */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="flag-outline" size={20} color="#007bff" />
            <Text style={styles.cardTitle}>Our Mission</Text>
          </View>
          <Text style={styles.cardBody}>
            Ipil Today! helps residents and visitors navigate Ipil with clear, up-to-date essentials — bus arrivals & departures, local news, emergency contacts, and places to explore.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles-outline" size={20} color="#007bff" />
            <Text style={styles.cardTitle}>Key Features</Text>
          </View>
          {[
            { icon: 'home-outline', text: 'Home hub for quick access to everything' },
            { icon: 'newspaper-outline', text: 'News feed for local updates' },
            { icon: 'call-outline', text: 'Emergency contacts and quick actions' },
            { icon: 'compass-outline', text: 'Explore destinations and tips' },
            { icon: 'bus-outline', text: 'Interactive bus arrivals & departures' },
          ].map((item, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons name={item.icon as any} size={18} color="#28a745" />
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="mail-outline" size={20} color="#007bff" />
            <Text style={styles.cardTitle}>Contact Us</Text>
          </View>
          <Text style={styles.cardBody}>
            Have feedback or spotted an issue? We’d love to hear from you.
          </Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.chip, styles.primaryChip]} onPress={openEmail}>
              <Ionicons name="send-outline" size={16} color="#fff" />
              <Text style={[styles.chipText, styles.primaryChipText]}>Email the Team</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={[styles.ctaBtn, styles.secondaryBtn]} onPress={() => router.push('/')}>
            <Ionicons name="home-outline" size={18} color="#fff" />
            <Text style={styles.ctaText}>Home</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.smallNote}>Developed by PUNDEMONIUM.Co</Text>
        <Text style={styles.smallNote}>© 2025 Ipil Today. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  content: { paddingBottom: 40 },
  heroCard: {
    backgroundColor: '#4a90e2',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginTop: 10,
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  tagline: { fontSize: 14, color: '#fff', marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { color: '#fff', fontSize: 12 },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginLeft: 8, color: '#007bff' },
  cardBody: { color: '#444', lineHeight: 20 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  featureText: { marginLeft: 8, color: '#333' },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 10, flexWrap: 'wrap' },
  chip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#eee' },
  chipText: { marginLeft: 6, color: '#333', fontWeight: '600' },
  primaryChip: { backgroundColor: '#4a90e2' },
  primaryChipText: { color: '#fff' },
  footerButtons: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 12, width: 150, alignItems: 'center', marginLeft: 90 },
  ctaBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 28 },
  primaryBtn: { backgroundColor: '#6c757d' },
  secondaryBtn: { backgroundColor: '#6c757d' },
  ctaText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  smallNote: { textAlign: 'center', color: '#6c757d', marginTop: 16, fontSize: 12 },
});
