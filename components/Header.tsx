import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type WeatherData = {
  temp: number;
  icon: string; // OpenWeather icon code, e.g., "01d"
};

type HeaderProps = {
  onDrawerPress: () => void;
};

export default function Header({ onDrawerPress }: HeaderProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        let LAT = 7.7833;
        let LON = 122.5833;

        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          LAT = location.coords.latitude;
          LON = location.coords.longitude;
        }

        // Fetch weather
        const API_KEY = '95c9f3003a88ce79581c5d85b122dfe0';
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=95c9f3003a88ce79581c5d85b122dfe0&units=metric`
        );
        const data = await res.json();

        if (data?.main?.temp && data?.weather?.[0]) {
          setWeather({
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
          });
        }
      } catch (err) {
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.header}>
      {/* Left: Logo + App Name */}
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/images/Bayan_ng_Ipil.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Ipil Today!</Text>
      </View>

      {/* Right: Weather + Drawer */}
      <View style={styles.rightRow}>
        {loading ? (
          <ActivityIndicator size="small" color="#555" style={{ marginRight: 10 }} />
        ) : (
          weather && (
            <View style={styles.weatherRow}>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
            </View>
          )
        )}

        <TouchableOpacity onPress={onDrawerPress} style={styles.drawerButton}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  weatherTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  drawerButton: {
    padding: 5,
  },
});
