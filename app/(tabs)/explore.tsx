import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Header />

      <Text style={styles.title}>Explore Ipil</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://example.com/place.jpg' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Ipil Plaza</Text>
        <Text style={styles.cardContent}>
          The central park of Ipil, a place where locals gather for events and leisure.
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://example.com/food.jpg' }}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Local Delicacies</Text>
        <Text style={styles.cardContent}>
          Enjoy fresh seafood and traditional Zamboanga Sibugay dishes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, marginTop: 3 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
  },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardContent: { fontSize: 15, color: '#333', lineHeight: 20 },
});
