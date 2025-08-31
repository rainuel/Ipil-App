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
import { Event, supabase } from '../../lib/supabase';

// Types
type Article = {
  title: string;
  link: string;
  description: string;
};

// Reusable Card Component
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const [latestNews, setLatestNews] = useState<Article | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Fetch events from Supabase
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // midnight
      const todayIso = today.toISOString();

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', todayIso) // works with date or timestamp
        .order('event_date', { ascending: true })
        .limit(6);

      if (error) {
        console.error('❌ Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      console.error('❌ Error fetching events:', err);
    } finally {
      setEventsLoading(false);
    }
  };

  // Fetch latest news
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

  useEffect(() => {
    fetchLatestNews();
    fetchEvents();

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

  // Format date for display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

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
        <Card title="📰 Latest National News">
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
                <Text style={styles.link}>Read more</Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.cardContent}>No news available.</Text>
          )}
        </Card>

        {/* UPCOMING EVENTS */}
        <Card title="📅 Upcoming Events">
          {eventsLoading ? (
            <ActivityIndicator size="small" color="#1976d2" />
          ) : events.length > 0 ? (
            events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventBullet}>•</Text>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>
                    {formatEventDate(event.event_date)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.cardContent}>No upcoming events.</Text>
          )}
        </Card>

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
              onPress={() => router.push('/explore')} // ✅ fixed
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

// Explore items
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

// Styles
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventBullet: {
    color: '#1976d2',
    fontSize: 18,
    marginRight: 6,
    marginTop: 2,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  eventDate: {
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '600',
    marginTop: 2,
  },
});
