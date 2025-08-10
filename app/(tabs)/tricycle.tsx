import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Coords = {
  latitude: number;
  longitude: number;
};

export default function BusScreen() {
  const ipilCoords = {
    latitude: 7.7833,
    longitude: 122.5833,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [location, setLocation] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const busData = [
    { id: '1', route: 'Zamboanga', arrival: '5 mins', departure: '10 mins' },
    { id: '2', route: 'Dipolog', arrival: '12 mins', departure: '15 mins' },
    { id: '3', route: 'Pagadian', arrival: '20 mins', departure: '25 mins' },
  ];

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={ipilCoords}
          showsUserLocation={true}
        >
          <Marker coordinate={ipilCoords} title="Ipil, Zamboanga Sibugay" />
          {location && (
            <Marker
              coordinate={location}
              pinColor="blue"
              title="Your Location"
            />
          )}
        </MapView>
      </View>

      {/* Bus Information Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Bus Arrival & Departure</Text>
        {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        <FlatList
          data={busData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.busRow}>
              <Text style={styles.route}>{item.route}</Text>
              <Text>Arrives in: {item.arrival}</Text>
              <Text>Departs in: {item.departure}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { height: '50%', marginTop: 25},
  map: { flex: 1 },
  infoContainer: { flex: 1, padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  busRow: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 8,
  },
  route: { fontWeight: 'bold' },
});
