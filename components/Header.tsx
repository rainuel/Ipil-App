import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
};

export default function Header() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true); // ✅ Start loading

        const API_KEY = '95c9f3003a88ce79581c5d85b122dfe0';
        let LAT = 7.7833;
        let LON = 122.5833;

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          LAT = location.coords.latitude;
          LON = location.coords.longitude;
        }

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=95c9f3003a88ce79581c5d85b122dfe0&units=metric`
        );
        const data = await res.json();

        if (data?.main?.temp && data?.weather?.[0]) {
          setWeather({
            temp: Math.round(data.main.temp),
            description:
              data.weather[0].description.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1).replace(' clouds', ''),
            icon: data.weather[0].icon,
          });
        }
      } catch (err) {
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/images/Bayan_ng_Ipil.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Ipil Today!</Text>
      </View>

      {/* ✅ Show loading indicator or weather */}
      {loading ? (
        <ActivityIndicator size="small" color="#555" />
      ) : (
        weather && (
          <View style={styles.weatherRow}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
            <View>
              <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
              <Text style={styles.weatherDesc}>{weather.description}</Text>
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1ff',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 45, height: 45, resizeMode: 'contain', marginRight: 10 },
  appName: { fontSize: 20, fontWeight: 'bold' },
  weatherRow: { flexDirection: 'row', alignItems: 'center' },
  weatherTemp: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  weatherDesc: { fontSize: 14, color: '#555' },
  weatherIcon: { width: 40, height: 40, marginRight: 6 },
});
