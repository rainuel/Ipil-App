import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu';

export default function SettingsScreen() {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* HEADER */}
        <Header onDrawerPress={() => setShowDrawer(true)} />

        {/* Drawer Menu */}
        {showDrawer && <Menu onClose={() => setShowDrawer(false)} />}

        {/* CONTENT */}
          <View style={styles.card}>
            <Ionicons name="settings-outline" size={28} color="#007bff" />
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>
              This page is coming soon! Here you will be able to customize your app experience.
            </Text>
          </View>

          {/* Home Button */}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/')}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={20} color="white" />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.smallNote}>Developed by the PUNDEMONIUM Team</Text>
          <Text style={styles.smallNote}>© 2025 Ipil Today. All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  content: { paddingTop: 10, paddingBottom: 40, alignItems: 'center' },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: 15,
    marginTop: 10
  },
  title: { fontSize: 20, fontWeight: '700', color: '#007bff', marginTop: 12 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginTop: 8 },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 460, // on purpose so that it wont scroll down T-T
    width: 150,
    marginLeft: 90
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
   smallNote: { textAlign: 'center', color: '#6c757d', marginTop: 16, fontSize: 12 },
});
