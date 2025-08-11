import { Image, StyleSheet, Text, View } from 'react-native';

export default function EmergencyScreen() {
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

      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.label}>Syempre kani tanan wala pa koy contact haha</Text>
      <Text style={styles.label}>Butngan sad ug location ang office</Text>
      <Text style={styles.label}></Text>

      <View style={styles.contact}>
        <Text style={styles.label}>Police:</Text>
        <Text style={styles.number}>+63 917-123-4567</Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.label}>Fire Department:</Text>
        <Text style={styles.number}>+63 912-345-6789</Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.label}>Hospital:</Text>
        <Text style={styles.number}>(062) 333-1234</Text>
        <Text style={styles.number}>+63 912-345-6789</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, marginTop: 20, },
  contact: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: 'bold' },
  number: { fontSize: 16, color: '#1976d2' },

  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardContent: { fontSize: 15, color: '#333', lineHeight: 20 },

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
