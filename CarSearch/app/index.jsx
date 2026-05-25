import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

import AuthScreen from "../src/screens/AuthScreen";
import { useAuth } from "../src/context/AuthContext";
import { theme } from "../src/styles/theme";

export default function IndexRoute() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator color={theme.colors.primaryLight} size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/busca" />;
  }

  return <AuthScreen />;
}
