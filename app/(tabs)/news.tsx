import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Header />

      {/* DIVIDER */}
      <View style={styles.divider} />

      <Text style={styles.title}>Latest News</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Electrocution Tragedy in Barangay Tiayon</Text>
        <Text style={styles.cardContent}>
          A tragic incident occurred in Barangay Tiayon, Ipil, where a local resident was electrocuted...
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cleanup Drive Announced</Text>
        <Text style={styles.cardContent}>
          Barangay officials have scheduled a cleanup drive for the community on Sept 20.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, marginTop: 5 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardContent: { fontSize: 15, lineHeight: 20, color: '#333' },

  divider: {
    height: 1,
    paddingTop: 1.2,
    backgroundColor: '#ccc',
    marginBottom: 15,
    marginTop: 0,
    width: '125%', // longer divider
    alignSelf: 'center',
  },
});
