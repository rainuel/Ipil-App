import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function BusScreen() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  // This is just a placeholder - I plan on putting it on a database for more flexible use.
  const busData = [
    { id: '1', route: 'Zamboanga', arrival: '5 mins', departure: '10 mins', details: 'Air-conditioned • ₱300 fare • ETA 3hrs' },
    { id: '2', route: 'Dipolog', arrival: '12 mins', departure: '15 mins', details: 'Regular • ₱270 fare SP • ETA 2.5hrs' },
    { id: '3', route: 'Pagadian', arrival: '20 mins', departure: '25 mins', details: 'Deluxe • ₱250 fare SP • ETA 2hrs' },
  ];

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Header onDrawerPress={() => setShowDrawer(true)} />

      {/* Drawer Menu */}
      {showDrawer && <Menu onClose={() => setShowDrawer(false)} />}

      {/* BUS INFO */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Bus Arrival & Departure</Text>

        <FlatList
          data={busData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const expanded = expandedId === item.id;
            return (
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.busRow, expanded && styles.expandedRow]}>
                  {/* Top Row */}
                  <View style={styles.rowHeader}>
                    <View style={styles.routeRow}>
                      <Ionicons name="bus-outline" size={20} color="#007bff" />
                      <Text style={styles.route}>{item.route}</Text>
                    </View>
                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={18} color="#28a745" />
                      <Text style={styles.timeText}>Arrives: {item.arrival}</Text>
                    </View>
                    <View style={styles.timeRow}>
                      <Ionicons name="exit-outline" size={18} color="#dc3545" />
                      <Text style={styles.timeText}>Departs: {item.departure}</Text>
                    </View>
                  </View>

                  {/* Expanded Details */}
                  {expanded && (
                    <View style={styles.details}>
                      <Ionicons name="information-circle-outline" size={18} color="#6c757d" />
                      <Text style={styles.detailsText}>{item.details}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* Sleek Back to Home Button */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  infoContainer: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333', marginTop: 10 },
  busRow: {
    padding: 14,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expandedRow: {
    backgroundColor: '#eaf4ff',
    borderColor: '#007bff',
  },
  rowHeader: { marginBottom: 5 },
  routeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  route: { fontWeight: 'bold', fontSize: 16, marginLeft: 6, color: '#007bff' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  timeText: { fontSize: 14, marginLeft: 6, color: '#444' },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  detailsText: { fontSize: 14, marginLeft: 6, color: '#555' },

  /* Home button */
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    width: 150,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
    smallNote: { textAlign: 'center', color: '#6c757d', marginTop: 16, fontSize: 12 },
});
