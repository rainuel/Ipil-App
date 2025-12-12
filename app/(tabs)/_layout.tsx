import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // hides "(tabs)" title at top (if not placed, tabs will be shown on the top and bottom part of the screen.)
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";

          if (route.name === "index") {
            iconName = "home-outline"; //index is our home page/ landing.
          } else if (route.name === "news") {
            iconName = "newspaper-outline";
          } else if (route.name === "emergency") {
            iconName = "call-outline";
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
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}