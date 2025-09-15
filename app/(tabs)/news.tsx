import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import NewsFeed from '../../components/NewsFeed';

export default function NewsScreen() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Close drawer when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setShowDrawer(false);
    }, [])
  );

  // Animate content on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate loading for demo purposes
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Header onDrawerPress={() => setShowDrawer(true)} />

      {/* DRAWER */}
      {showDrawer && ( // WHY IS THIS REPEATED??
        <Menu
          onClose={() => setShowDrawer(false)}
          onLogout={() => setShowDrawer(false)}
          user={{
            name: 'Jeco Berbs',
            email: 'jecjec@example.com',
            avatar: require('../../assets/images/profile.png'),
          }}
        />
       )} 

      {/* MAIN CONTENT */}
      <Animated.View
        style={[
          styles.mainContent,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📰 Latest National News</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#1976d2" />
          ) : (
            <NewsFeed />
          )}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
  },
  mainContent: {
    flex: 1,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
});
