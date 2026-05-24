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
  const displayEmail = maskEmail(user?.email);

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
        <Text style={styles.kicker}>Conta</Text>
        <Text style={styles.title}>Meu perfil</Text>
        <Text style={styles.subtitle}>
          Gerencie sua sessão e acompanhe o status da sua conta no CarSearch.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={34} color={theme.colors.text} />
          </View>
          <Text style={styles.name}>{user?.displayName || "Usuário CarSearch"}</Text>
          <Text style={styles.email}>{displayEmail}</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoIcon}>
              <Ionicons name="checkmark-circle-outline" size={20} color={theme.colors.success} />
            </View>
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Status da sessão</Text>
              <Text style={styles.infoValue}>Conta conectada neste dispositivo.</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoIcon}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.primaryLight} />
            </View>
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Privacidade</Text>
              <Text style={styles.infoValue}>Seu histórico fica separado dos demais usuários.</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={20} color={theme.colors.primaryLight} />
            </View>
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Recuperação de acesso</Text>
              <Text style={styles.infoValue}>Use a tela de login para receber um link de redefinição de senha.</Text>
            </View>
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

function maskEmail(email) {
  if (!email) return "E-mail não disponível";

  const [name, domain] = String(email).split("@");
  if (!name || !domain) return "E-mail cadastrado";

  const visibleName = name.length <= 2 ? name[0] : name.slice(0, 2);
  return `${visibleName}***@${domain}`;
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
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  infoTextBox: {
    flex: 1
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
