import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../context/AuthContext";
import { theme } from "../styles/theme";

export default function AuthScreen() {
  const { login, register, resetPassword, authLoading, isFirebaseConfigured } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatórios", "Informe e-mail e senha para continuar.");
      return;
    }

    if (isRegister && password.length < 6) {
      Alert.alert("Senha muito curta", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      Alert.alert("Erro de autenticação", translateFirebaseError(error));
    }
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      Alert.alert("Informe o e-mail", "Digite seu e-mail para receber o link de redefinição.");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert("E-mail enviado", "Confira sua caixa de entrada para redefinir a senha.");
    } catch (error) {
      Alert.alert("Não foi possível enviar", translateFirebaseError(error));
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Firebase Auth + Firestore</Text>
        <Text style={styles.title}>Acesse o CarSearch</Text>
        <Text style={styles.subtitle}>
          Cada usuário entra com sua conta e mantém um histórico próprio de pesquisas no Firebase.
        </Text>

        {!isFirebaseConfigured ? (
          <View style={styles.warningCard}>
            <Ionicons name="warning-outline" size={20} color={theme.colors.warning} />
            <Text style={styles.warningText}>
              Firebase ainda não configurado. Preencha o arquivo .env com as chaves do seu projeto Firebase para liberar login e cadastro.
            </Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleButton, !isRegister && styles.toggleButtonActive]}
              onPress={() => setMode("login")}
            >
              <Text style={[styles.toggleText, !isRegister && styles.toggleTextActive]}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, isRegister && styles.toggleButtonActive]}
              onPress={() => setMode("register")}
            >
              <Text style={[styles.toggleText, isRegister && styles.toggleTextActive]}>Criar conta</Text>
            </TouchableOpacity>
          </View>

          {isRegister ? (
            <TextInput
              placeholder="Nome do usuário ou equipe"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          ) : null}

          <TextInput
            placeholder="E-mail"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.primaryButton, (!isFirebaseConfigured || authLoading) && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFirebaseConfigured || authLoading}
          >
            {authLoading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>{isRegister ? "Cadastrar" : "Entrar"}</Text>
                <Ionicons name="log-in-outline" size={18} color={theme.colors.text} />
              </>
            )}
          </TouchableOpacity>

          {!isRegister ? (
            <TouchableOpacity style={styles.linkButton} onPress={handleResetPassword} disabled={!isFirebaseConfigured}>
              <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function translateFirebaseError(error) {
  const code = error?.code || "";
  if (code.includes("auth/invalid-email")) return "E-mail inválido.";
  if (code.includes("auth/email-already-in-use")) return "Este e-mail já está cadastrado.";
  if (code.includes("auth/weak-password")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password")) return "E-mail ou senha incorretos.";
  if (code.includes("auth/user-not-found")) return "Usuário não encontrado.";
  return error?.message || "Erro inesperado ao autenticar.";
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
    width: 170,
    height: 82,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 8
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
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18
  },
  warningCard: {
    backgroundColor: "rgba(245,158,11,0.12)",
    borderColor: theme.colors.warning,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    marginBottom: 16
  },
  warningText: {
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center"
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.primary
  },
  toggleText: {
    color: theme.colors.muted,
    fontWeight: "800"
  },
  toggleTextActive: {
    color: theme.colors.text
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4
  },
  disabledButton: {
    opacity: 0.55
  },
  primaryButtonText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 16
  },
  linkButton: {
    alignItems: "center",
    marginTop: 14
  },
  linkText: {
    color: theme.colors.primaryLight,
    fontWeight: "800"
  }
});
