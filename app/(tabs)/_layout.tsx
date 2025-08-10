import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // hides "(tabs)" title at top
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";

          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "news") {
            iconName = "newspaper-outline";
          } else if (route.name === "emergency") {
            iconName = "call-outline";
          } else if (route.name === "tricycle") {
            iconName = "bicycle-outline";
          } else if (route.name === "explore") {
            iconName = "compass-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="news" options={{ title: "News" }} />
      <Tabs.Screen name="emergency" options={{ title: "Emergency" }} />
      <Tabs.Screen name="tricycle" options={{ title: "Transportation" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
