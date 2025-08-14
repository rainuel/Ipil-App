import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Header />

      <Text style={styles.title}>Explore Ipil</Text>

      {/* Provincial Capitol */}
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/capitol.jpg')}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>
          Zamboanga Sibugay Provincial Capitol
        </Text>
        <Text style={styles.cardContent}>
          The Zamboanga Sibugay Capitol combines modern and traditional Filipino
          architecture, with a symmetrical façade, gable roofs, and landscaped
          grounds that highlight the province's cultural heritage.
        </Text>
      </View>

      {/* Rotunda Obelisk */}
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/rotunda.jpg')}
          style={styles.image}
        />
        <Text style={styles.cardTitle}>Ipil Rotunda Obelisk</Text>
        <Text style={styles.cardContent}>
          A symbolic landmark of Zamboanga Sibugay, the Rotunda Obelisk stands
          as a tribute to the province’s history, unity, and cultural identity.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  cardContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
});
