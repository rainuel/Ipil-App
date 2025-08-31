import { Button, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="News" onPress={() => navigation.navigate('News')} />
      <Button title="Emergency" onPress={() => navigation.navigate('Emergency')} />
      <Button title="Road & Events" onPress={() => navigation.navigate('RoadEvents')} />
      <Button title="Tricycle Drivers" onPress={() => navigation.navigate('Drivers')} />
    </View>
    );
}