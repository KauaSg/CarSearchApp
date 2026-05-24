import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../context/AuthContext";
import { theme } from "../styles/theme";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  function handleLogout() {
    Alert.alert("Sair da conta", "Deseja encerrar a sessão neste dispositivo?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout }
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />
        <Text style={styles.kicker}>Conta Firebase</Text>
        <Text style={styles.title}>Perfil do usuário</Text>
        <Text style={styles.subtitle}>
          O login separa o histórico por usuário, melhora a rastreabilidade e aproxima o app de uma solução real para a Ford.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={34} color={theme.colors.text} />
          </View>
          <Text style={styles.name}>{user?.displayName || "Usuário CarSearch"}</Text>
          <Text style={styles.email}>{user?.email || "E-mail não disponível"}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>UID Firebase</Text>
            <Text style={styles.infoValue} numberOfLines={2}>{user?.uid || "Não disponível"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Histórico</Text>
            <Text style={styles.infoValue}>Salvo em users/{user?.uid || "uid"}/history no Firestore</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={theme.colors.text} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scroll: {
    padding: theme.spacing.screen,
    paddingTop: 56,
    paddingBottom: 36
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10
  },
  kicker: {
    color: theme.colors.primaryLight,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center"
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  name: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800"
  },
  email: {
    color: theme.colors.muted,
    marginTop: 4,
    marginBottom: 16
  },
  infoBox: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 10
  },
  infoLabel: {
    color: theme.colors.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  infoValue: {
    color: theme.colors.text,
    marginTop: 6,
    lineHeight: 20
  },
  logoutButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 12,
    padding: 15,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  logoutText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 16
  }
});
