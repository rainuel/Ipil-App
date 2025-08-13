// components/NewsFeed.tsx
import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Article = {
  title: string;
  link: string;
  description: string;
};

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
  `https://newsdata.io/api/1/news?apikey=pub_1e16d02618b6447cb50130b4294126f6&country=ph&language=en&q=abs-cbn`
);

        const data = await res.json();
        setArticles(data.results || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />;
  }

  return (
    <ScrollView>
      {articles.map((article, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => Linking.openURL(article.link)}>
          <Text style={styles.cardTitle}>{article.title}</Text>
          <Text style={styles.cardContent}>{article.description || 'Read more...'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardContent: { fontSize: 15, lineHeight: 20, color: '#333' },
});
