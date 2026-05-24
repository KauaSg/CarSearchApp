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
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { compararVeiculos } from "../service/CarService";
import CarInfosComponent from "../components/CarInfosComponent";
import { theme } from "../styles/theme";

export default function CarComparatorScreen({ navigation }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [versao, setVersao] = useState("");
  const [marca2, setMarca2] = useState("");
  const [modelo2, setModelo2] = useState("");
  const [versao2, setVersao2] = useState("");
  const [loading, setLoading] = useState(false);

  function fillDemo() {
    setMarca("Ford");
    setModelo("Ranger");
    setVersao("Raptor");
    setMarca2("Toyota");
    setModelo2("Hilux");
    setVersao2("SRX");
  }

  async function handleComparar() {
    const carros = {
      marca: marca.trim(),
      modelo: modelo.trim(),
      versao: versao.trim(),
      marca2: marca2.trim(),
      modelo2: modelo2.trim(),
      versao2: versao2.trim()
    };

    if (Object.values(carros).some((value) => !value)) {
      Alert.alert("Campos obrigatórios", "Preencha os dois veículos para comparar.");
      return;
    }

    setLoading(true);

    try {
      const resultado = await compararVeiculos(carros);
      navigation.navigate("ComparatorResult", { carros, resultado });
    } catch (error) {
      Alert.alert("Erro na comparação", error.message || "Não foi possível comparar os veículos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Benchmark automotivo</Text>
        <Text style={styles.title}>Comparar veículos</Text>
        <Text style={styles.subtitle}>
          Compare dois modelos para apoiar a análise de posicionamento entre Ford e concorrentes.
        </Text>

        <View style={styles.card}>
          <CarInfosComponent
            title="Veículo 1"
            marca={marca}
            modelo={modelo}
            versao={versao}
            setMarca={setMarca}
            setModelo={setModelo}
            setVersao={setVersao}
          />
        </View>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.card}>
          <CarInfosComponent
            title="Veículo 2"
            marca={marca2}
            modelo={modelo2}
            versao={versao2}
            setMarca={setMarca2}
            setModelo={setModelo2}
            setVersao={setVersao2}
          />
        </View>

        <View style={styles.flowControl}>
          <TouchableOpacity style={styles.secondaryButton} onPress={fillDemo}>
            <Text style={styles.secondaryButtonText}>Preencher demo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleComparar} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Comparar</Text>
                <Ionicons name="git-compare-outline" size={18} color={theme.colors.text} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scroll: {
    padding: theme.spacing.screen,
    paddingTop: 52,
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
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4
  },
  subtitle: {
    color: theme.colors.muted,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 18
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 14
  },
  vsBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 14
  },
  vsText: {
    color: theme.colors.text,
    fontWeight: "900"
  },
  flowControl: {
    flexDirection: "row",
    gap: 12
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontWeight: "800",
    textAlign: "center"
  },
  primaryButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  primaryButtonText: {
    color: theme.colors.text,
    fontWeight: "800"
  }
});
