import { StyleSheet, Text, View } from 'react-native';

export default function EmergencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.label}>Syempre kani tanan wala pa koy contact haha</Text>
      <Text style={styles.label}>Butngan sad ug location ang office</Text>

      <View style={styles.contact}>
        <Text style={styles.label}>Police:</Text>
        <Text style={styles.number}>+63 917-123-4567</Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.label}>Fire Department:</Text>
        <Text style={styles.number}>+63 912-345-6789</Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.label}>Hospital:</Text>
        <Text style={styles.number}>(062) 333-1234</Text>
        <Text style={styles.number}>+63 912-345-6789</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, marginTop: 20, },
  contact: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: 'bold' },
  number: { fontSize: 16, color: '#1976d2' },
});
