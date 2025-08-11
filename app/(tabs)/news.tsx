import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function NewsScreen() {
  
  return (
    <ScrollView style={styles.container}>
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
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, marginTop: 5, },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardContent: { fontSize: 15, lineHeight: 20, color: '#333' },

    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
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
  }
});
