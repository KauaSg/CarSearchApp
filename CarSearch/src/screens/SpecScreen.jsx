import React, { useMemo, useState } from "react";
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

import { buscarCarro } from "../service/CarService";
import { saveHistoryItem } from "../service/StorageService";
import { useAuth } from "../context/AuthContext";
import { DEFAULT_SPECIFICATIONS } from "../data/defaultSpecifications";
import { theme } from "../styles/theme";

export default function SpecScreen({ navigation, route }) {
  const { marca, modelo, versao } = route.params || {};
  const [especificacao, setEspecificacao] = useState("");
  const [especificacoesList, setEspecificacoesList] = useState(DEFAULT_SPECIFICATIONS);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const vehicleTitle = useMemo(
    () => `${marca || ""} ${modelo || ""} ${versao || ""}`.replace(/\s+/g, " ").trim(),
    [marca, modelo, versao]
  );

  function addSpec(spec = especificacao) {
    const clean = String(spec || "").trim();
    if (!clean) return;

    const alreadyExists = especificacoesList.some(
      (item) => item.toLowerCase() === clean.toLowerCase()
    );

    if (alreadyExists) {
      setEspecificacao("");
      return;
    }

    setEspecificacoesList((prev) => [...prev, clean]);
    setEspecificacao("");
  }

  function removeItem(indexToRemove) {
    setEspecificacoesList((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  async function handleBuscar() {
    if (!especificacoesList.length) {
      Alert.alert("Atributos necessários", "Adicione pelo menos uma especificação para pesquisar.");
      return;
    }

    setLoading(true);

    const carro = {
      marca,
      modelo,
      versao,
      especificacoes: especificacoesList
    };

    try {
      const resultado = await buscarCarro(carro);
      await saveHistoryItem({
        ...resultado,
        requestedSpecs: especificacoesList,
        userEmail: user?.email || null
      }, user?.uid);

      navigation.navigate("Result", { resultado });
    } catch (error) {
      Alert.alert("Erro na consulta", error.message || "Não foi possível consultar a API.");
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

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTextBox}>
            <Text style={styles.kicker}>Atributos técnicos</Text>
            <Text style={styles.title}>{vehicleTitle}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adicionar especificações livres</Text>
          <Text style={styles.cardText}>
            Defina os campos que a IA/API deve devolver. O formato final será padronizado em cards comparáveis.
          </Text>

          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Ex: consumo, porta-malas, airbag..."
              placeholderTextColor={theme.colors.muted}
              value={especificacao}
              onChangeText={setEspecificacao}
              onSubmitEditing={() => addSpec()}
              returnKeyType="done"
            />

            <TouchableOpacity style={styles.buttonAdd} onPress={() => addSpec()}>
              <Ionicons name="add-outline" size={22} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Lista da consulta</Text>
            <Text style={styles.counter}>{especificacoesList.length} itens</Text>
          </View>

          <View style={styles.chipList}>
            {especificacoesList.map((item, index) => (
              <TouchableOpacity key={`${item}-${index}`} onPress={() => removeItem(index)} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
                <Ionicons name="close-outline" size={16} color={theme.colors.text} />
              </TouchableOpacity>
            ))}
          </View>

          {especificacoesList.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma especificação adicionada.</Text>
          ) : null}
        </View>

        <View style={styles.flowControl}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => setEspecificacoesList(DEFAULT_SPECIFICATIONS)}>
            <Text style={styles.secondaryButtonText}>Restaurar padrão</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBuscar} style={styles.primaryButton} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Consultar</Text>
                <Ionicons name="sparkles-outline" size={18} color={theme.colors.text} />
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
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  headerTextBox: {
    flex: 1
  },
  kicker: {
    color: theme.colors.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2
  },
  title: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: "800",
    marginTop: 2
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  cardText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 14
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  counter: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  buttonAdd: {
    backgroundColor: theme.colors.success,
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9
  },
  chip: {
    backgroundColor: theme.colors.cardSoft,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  chipText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700"
  },
  emptyText: {
    color: theme.colors.muted,
    textAlign: "center",
    padding: 16
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
