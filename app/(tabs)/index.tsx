import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'; // import reusable header

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>
        {/* NEWS PREVIEW */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest News</Text>
          <Text style={styles.cardContent}>
            Electrocution Tragedy: A tragic incident occurred in Barangay Tiayon, Ipil...
          </Text>
          <Pressable onPress={() => router.push('/news')}>
            <Text style={styles.link}>Read more</Text>
          </Pressable>
        </View>

        {/* UPCOMING EVENTS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Events</Text>
          <Text style={styles.cardContent}>Arrival of Germany – Sept 3</Text>
          <Text style={styles.cardContent}>Departure for Dumaguete – Sept 13-15</Text>
          <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  mainContent: {
    flex: 1,
    paddingTop: 10,
  },
  link: {
    color: '#1976d2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
});
