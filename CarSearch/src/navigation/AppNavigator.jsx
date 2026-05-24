import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AuthProvider, useAuth } from "../context/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import SearchNavigator from "./SearchNavigator";
import ComparatorNavigator from "./ComparatorNavigator";
import HistoryScreen from "../screens/HistoryScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { theme } from "../styles/theme";

const Tab = createBottomTabNavigator();

const icons = {
  Busca: "search-outline",
  Comparar: "git-compare-outline",
  Historico: "time-outline",
  Sobre: "information-circle-outline",
  Perfil: "person-circle-outline"
};

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator color={theme.colors.primaryLight} size="large" />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Busca"
        component={SearchNavigator}
        options={{ tabBarLabel: "Buscar" }}
      />
      <Tab.Screen
        name="Comparar"
        component={ComparatorNavigator}
        options={{ tabBarLabel: "Comparar" }}
      />
      <Tab.Screen
        name="Historico"
        component={HistoryScreen}
        options={{ tabBarLabel: "Histórico" }}
      />
      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{ tabBarLabel: "Sobre" }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
