import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

type Article = {
  title: string;
  link: string;
  description: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [latestNews, setLatestNews] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_1e16d02618b6447cb50130b4294126f6&country=ph&language=en&q=abs-cbn`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setLatestNews(data.results[0]); // only first article
        }
      } catch (err) {
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Header />

      <View style={styles.mainContent}>
        {/* LATEST NATIONAL NEWS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest National News</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
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
        </View>

        {/* UPCOMING EVENTS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Events</Text>
          <Text style={styles.cardContent}>Arrival of Germany – Sept 3</Text>
          <Text style={styles.cardContent}>Departure for Dumaguete – Sept 13-15</Text>
          <Text style={styles.cardContent}>Barangay Cleanup Drive – Sept 20</Text>
        </View>

        {/* EXPLORE SECTION */}
        <Pressable style={styles.card} onPress={() => router.push('/explore')}>
          <Text style={styles.cardTitle}>Explore</Text>
          <Text style={styles.cardContent}>
            Discover more about our community and nearby places.
          </Text>
          <Text style={styles.link}>Go to Explore</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainContent: {
    flex: 1,
    paddingTop: 10,
  },
  link: {
    color: '#1976d2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
});
