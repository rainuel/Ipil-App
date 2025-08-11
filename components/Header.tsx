import { Image, StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/images/Bayan_ng_Ipil.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Ipil Community Hub</Text>
      </View>
      <View style={styles.weather}>
        <Text style={styles.weatherTemp}>🌤 29°C</Text>
        <Text style={styles.weatherDesc}>Cloudy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
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
});
