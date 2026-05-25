import { ActivityIndicator, View } from "react-native";
import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../../src/context/AuthContext";
import { theme } from "../../src/styles/theme";

const icons = {
  busca: "search-outline",
  comparar: "git-compare-outline",
  historico: "time-outline",
  sobre: "information-circle-outline",
  perfil: "person-circle-outline"
};

export default function TabsLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator color={theme.colors.primaryLight} size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.fordBlue,
          borderTopWidth: 0,
          minHeight: 62,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 6
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name] || "ellipse-outline"} size={size} color={color} />
        )
      })}
    >
      <Tabs.Screen name="busca" options={{ title: "Buscar" }} />
      <Tabs.Screen name="comparar" options={{ title: "Comparar" }} />
      <Tabs.Screen name="historico" options={{ title: "Histórico" }} />
      <Tabs.Screen name="sobre" options={{ title: "Sobre" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
