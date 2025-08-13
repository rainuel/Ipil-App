import { ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../../components/Header';
import NewsFeed from '../../components/NewsFeed';

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Header />

      <Text style={styles.title}>Latest National News</Text>

      {/* Live News Feed */}
      <NewsFeed />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, marginTop: 5 },
});
