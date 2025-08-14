import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function EmergencyScreen() {
  const contacts = [
    {
      name: 'Police Department',
      number: '+63 917-123-4567',
      address: 'Ipil Police Station, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/police_logo.png'),
    },
    {
      name: 'Fire Department',
      number: '+63 912-345-6789',
      address: 'Ipil Fire Station, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/bfp_logo.png'),
    },
    {
      name: 'Health Department',
      number: '(062) 333-1234',
      address: 'Ipil District Hospital, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/health_logo.jpg'),
    },
    {
      name: 'ZAMSURECO',
      number: '+63 917-987-6543',
      address: 'ZAMSURECO I Office, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/zamsureco_logo.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.title}>Emergency Contacts</Text>

      {contacts.map((contact, index) => (
        <View key={index} style={styles.card}>
          <Image source={contact.logo} style={styles.logo} />
          <View>
            <Text style={styles.label}>{contact.name}</Text>
            <Text style={styles.number}>{contact.number}</Text>
            <Text style={styles.address}>{contact.address}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.disclaimer}>
        ⚠ This is for emergency purposes only. Please avoid making prank calls.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { 
  fontSize: 24, 
  fontWeight: 'bold', 
  textAlign: 'center', 
  marginBottom: 15, 
  marginTop: 25 
},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  logo: { width: 50, height: 50, marginRight: 15, resizeMode: 'contain' },
  label: { fontSize: 16, fontWeight: 'bold' },
  number: { fontSize: 16, color: '#1976d2' },
  address: { fontSize: 14, color: '#555', marginTop: 2 },
  disclaimer: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
