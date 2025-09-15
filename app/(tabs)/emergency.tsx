import * as Clipboard from 'expo-clipboard';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function EmergencyScreen() {
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

  const contacts = [
    {
      name: 'Police Department',
      number: '0977-849-0091',
      address: 'Ipil Police Station, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/police_logo.png'),
    },
    {
      name: 'Ipil Municipal Fire Station',
      number: '0953-839-5673',
      address: 'Ipil Fire Station, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/bfp_logo.png'),
    },
    {
      name: 'GTH Medical Center',
      number: '0965-427-7072',
      address: 'Barangay Tenan, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/gth_hospital_nobg.png'),
    },
    {
      name: 'ZAMSURECO',
      number: '0935-283-0948',
      address: 'ZAMSURECO I Office, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/zamsureco_logo.jpg'),
    },
    {
      name: 'LDRRMC Ipil',
      number: '0931-713-7638',
      address: 'LDRRMC Office, Ipil, Zamboanga Sibugay',
      logo: require('../../assets/images/ldrrmc_logo.jpg')
    }
  ];

  // Handle copy to clipboard
  const copyToClipboard = async (number: string) => {
    await Clipboard.setStringAsync(number);
    Alert.alert("Copied!", `Phone number ${number} copied to clipboard.`);
  };

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
        <Text style={styles.title}>Emergency Contacts</Text>

        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => Linking.openURL(`tel:${contact.number}`)}
            onLongPress={() => copyToClipboard(contact.number)}
          >
            <Image source={contact.logo} style={styles.logo} />
            <View>
              <Text style={styles.label}>{contact.name}</Text>
              <Text style={styles.number}>{contact.number}</Text>
              <Text style={styles.address}>{contact.address}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.disclaimer}>
          ⚠ This is for emergency purposes only. Please avoid making prank calls.
        </Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe', padding: 20 },
  mainContent: { flex: 1, paddingTop: 10 },
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  logo: { width: 50, height: 50, marginRight: 15, resizeMode: 'contain' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#222' },
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
