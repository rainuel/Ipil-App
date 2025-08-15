import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function ExploreScreen() {
  const [showDrawer, setShowDrawer] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Header onDrawerPress={() => setShowDrawer(true)} />

      {/* DRAWER */}
      {showDrawer && <Menu onClose={() => setShowDrawer(false)} />}

      {/* MAIN CONTENT */}
      <Animated.View
        style={[
          styles.mainContent,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
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
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe', padding: 20 },
  mainContent: { flex: 1, paddingTop: 10 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
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
