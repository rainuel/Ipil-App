import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type User = {
  name: string;
  email?: string;
  avatar?: any; // local image require() or URI
};

type MenuProps = {
  onClose: () => void;
  onLogout?: () => void;
  user?: User;
};

type MenuRoute = '/about' | '/settings' | '/transportation' | '/appointment';

export default function Menu({ onClose, onLogout, user }: MenuProps) {
  const router = useRouter();

  const displayUser: User = user || {
    name: 'Example D. Luffy',
    email: 'jeco@example.com',
    avatar: require('../assets/images/profile.png'),
  };

  const navigateTo = (path: MenuRoute) => {
    router.push(path);
    onClose();
  };

  return (
    <View style={styles.drawer}>
      {/* CLOSE BUTTON */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>✕ Close</Text>
      </TouchableOpacity>

      {/* USER INFO */}
      <View style={styles.userInfo}>
        <Image source={displayUser.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{displayUser.name}</Text>
          {displayUser.email && <Text style={styles.userEmail}>{displayUser.email}</Text>}
        </View>
      </View>

      {/* MENU ITEMS */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.item} onPress={() => navigateTo('/about')}>
          <Text style={styles.itemText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo('/settings')}>
          <Text style={styles.itemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo('/transportation')}>
          <Text style={styles.itemText}>Transportation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigateTo('/appointment')}>
          <Text style={styles.itemText}>Set Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT BUTTON AT BOTTOM */}
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={onLogout || (() => {})} // fallback noop if not provided
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
  position: 'absolute',
  top: 20,       
  right: 0,
  width: 250,
  height: 500,   // fixed height
  backgroundColor: '#fff',
  padding: 20,
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowOffset: { width: -2, height: 0 },
  shadowRadius: 4,
  elevation: 5,
  zIndex: 1000,
  justifyContent: 'space-between',
},
  closeButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  menuItems: {
    flex: 1, // push logout to bottom
    justifyContent: 'flex-start',
  },
  item: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  logoutContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});
