import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

type Article = {
  title: string;
  link: string;
  description: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const [latestNews, setLatestNews] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_1e16d02618b6447cb50130b4294126f6&country=ph&language=en&q=abs-cbn`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setLatestNews(data.results[0]);
        }
      } catch (err) {
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();

    // Fade and slide animation for the whole content
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
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Header onDrawerPress={() => setShowDrawer(true)} />

      {/* Drawer Menu */}
      {showDrawer && <Menu onClose={() => setShowDrawer(false)} />}

      {/* MAIN CONTENT */}
      <Animated.View
        style={[
          styles.mainContent,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* LATEST NATIONAL NEWS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📰 Latest National News</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#1976d2" />
          ) : latestNews ? (
            <>
              <Text style={styles.cardContent}>
                {latestNews.title.length > 80
                  ? latestNews.title.slice(0, 80) + '...'
                  : latestNews.title}
              </Text>
              <Pressable onPress={() => router.push('/news')}>
                <Text style={styles.link}>Read more →</Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.cardContent}>No news available.</Text>
          )}
        </View>

        {/* UPCOMING EVENTS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Upcoming Events</Text>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Arrival of Germany – Sept 3</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Departure for Dumaguete – Sept 13-15</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventBullet}>•</Text>
            <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
          </View>
        </View>

        {/* EXPLORE SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.cardTitle}>🌏 Explore</Text>
          <Pressable onPress={() => router.push('/explore')}>
            <Text style={styles.link}>See all →</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {exploreItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.exploreCard}
              onPress={() => router.push('/explore')}
            >
              <Image
                source={item.image}
                style={styles.exploreImage}
                resizeMode="cover"
              />
              <Text style={styles.exploreText}>{item.title}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    </ScrollView>
  );
}

const exploreItems = [
  {
    title: 'Provincial Capitol',
    image: require('../../assets/images/capitol.jpg'),
  },
  {
    title: 'Rotunda Obelisk',
    image: require('../../assets/images/rotunda.jpg'),
  },
  {
    title: 'Local Delicacies',
    image: { uri: 'https://via.placeholder.com/300' },
  },
];

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
  link: {
    color: '#1976d2',
    fontWeight: '600',
    marginTop: 8,
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
  cardContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  exploreCard: {
    width: 160,
    marginRight: 14,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 2 },
  },
  exploreImage: {
    width: '100%',
    height: 110,
  },
  exploreText: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventBullet: {
    color: '#1976d2',
    fontSize: 18,
    marginRight: 6,
  },
});
