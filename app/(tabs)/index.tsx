import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/images/Bayan_ng_Ipil.png')}
            style={styles.logo}
          />
          <Text style={styles.appName}>Ipil Community Hub</Text>
        </View>
        <View style={styles.weather}>
          <Text style={styles.weatherTemp}>🌤 29°C</Text>
          <Text style={styles.weatherDesc}>Cloudy</Text>
        </View>
      </View>

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
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginRight: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  weather: {
    alignItems: 'flex-end',
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherDesc: {
    fontSize: 15,
    color: 'gray',
  },
  mainContent: {
    flex: 1,
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
    elevation: 4, // stronger shadow for Android
    shadowColor: '#000', // iOS shadow
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
