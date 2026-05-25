import React, { useEffect, useState } from "react";
import {
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
import { router, useLocalSearchParams } from "expo-router";

import { QUICK_VEHICLES } from "../data/defaultSpecifications";
import { theme } from "../styles/theme";

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [versao, setVersao] = useState("");

  useEffect(() => {
    const vehicle = parseJsonParam(params.historyVehicle);
    if (vehicle) {
      setMarca(vehicle.marca || "");
      setModelo(vehicle.modelo || "");
      setVersao(vehicle.versao || "");
    }
  }, [params.historyVehicle]);

  function validateAndContinue() {
    const payload = {
      marca: marca.trim(),
      modelo: modelo.trim(),
      versao: versao.trim()
    };

    if (!payload.marca || !payload.modelo || !payload.versao) {
      Alert.alert("Campos obrigatórios", "Informe marca, modelo e versão para continuar.");
      return;
    }

    router.push({
      pathname: "/busca/spec",
      params: payload
    });
  }

  function fillVehicle(vehicle) {
    setMarca(vehicle.marca);
    setModelo(vehicle.modelo);
    setVersao(vehicle.versao);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>FIAP Challenge Ford</Text>
        <Text style={styles.title}>CarSearch</Text>
        <Text style={styles.subtitle}>
          Pesquise especificações técnicas e transforme buscas manuais em uma ficha padronizada para análise competitiva.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="car-outline" size={22} color={theme.colors.primaryLight} />
            <Text style={styles.cardTitle}>Veículo para consulta</Text>
          </View>

          <TextInput
            placeholder="Marca (ex: Ford)"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
            autoCapitalize="words"
            maxLength={30}
          />

          <TextInput
            placeholder="Modelo (ex: Ranger)"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={modelo}
            onChangeText={setModelo}
            autoCapitalize="words"
            maxLength={40}
          />

          <TextInput
            placeholder="Versão (ex: Raptor)"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={versao}
            onChangeText={setVersao}
            autoCapitalize="words"
            maxLength={60}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={validateAndContinue}>
            <Text style={styles.buttonText}>Selecionar atributos</Text>
            <Ionicons name="arrow-forward-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="flash-outline" size={22} color={theme.colors.primaryLight} />
            <Text style={styles.cardTitle}>Atalhos para teste</Text>
          </View>

          <View style={styles.quickGrid}>
            {QUICK_VEHICLES.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.label}
                style={styles.quickChip}
                onPress={() => fillVehicle(vehicle)}
              >
                <Text style={styles.quickChipText}>{vehicle.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.muted} />
          <View style={styles.infoTextBox}>
            <Text style={styles.infoTitle}>Consulta conectada</Text>
            <Text style={styles.infoText}>As informações são processadas pela solução CarSearch em tempo real.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function parseJsonParam(value) {
  if (!value) return null;

  try {
    return JSON.parse(Array.isArray(value) ? value[0] : value);
  } catch {
    return null;
  }
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
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 8
  },
  kicker: {
    color: theme.colors.primaryLight,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  title: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800"
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
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 16
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  quickChip: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 12
  },
  quickChipText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700"
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  infoTextBox: {
    flex: 1
  },
  infoTitle: {
    color: theme.colors.text,
    fontWeight: "800"
  },
  infoText: {
    color: theme.colors.muted,
    marginTop: 3,
    fontSize: 12
  }
});
