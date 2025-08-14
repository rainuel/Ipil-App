import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import NewsFeed from '../../components/NewsFeed';

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Header />

      <Text style={styles.title}>Latest National News</Text>

      {/* Live News Feed handles its own scroll & refresh */}
      <NewsFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, marginTop: 5 },
});
