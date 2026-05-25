import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import { clearHistory, getHistory } from "../service/StorageService";
import { useAuth } from "../context/AuthContext";
import { theme } from "../styles/theme";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  const loadHistory = React.useCallback(async () => {
    const items = await getHistory(user?.uid);
    setHistory(items);
  }, [user?.uid]);

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  async function handleClear() {
    Alert.alert("Limpar histórico", "Deseja apagar as pesquisas salvas?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: async () => {
          await clearHistory(user?.uid);
          setHistory([]);
        }
      }
    ]);
  }

  function reuseSearch(item) {
    router.push({
      pathname: "/busca",
      params: { historyVehicle: JSON.stringify(item) }
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Histórico</Text>
        <Text style={styles.title}>Histórico de pesquisas</Text>
        <Text style={styles.subtitle}>
          Suas últimas consultas ficam salvas na conta atual para facilitar novas análises.
        </Text>

        <View style={styles.headerRow}>
          <Text style={styles.counter}>{history.length} consultas salvas</Text>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear} disabled={!history.length}>
            <Ionicons name="trash-outline" size={16} color={history.length ? theme.colors.text : theme.colors.muted} />
            <Text style={[styles.clearButtonText, !history.length && styles.disabledText]}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {history.length ? (
          history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyTitleBox}>
                  <Text style={styles.vehicleTitle}>
                    {item.marca} {item.modelo} {item.versao}
                  </Text>
                  <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
                </View>
                <TouchableOpacity style={styles.reuseButton} onPress={() => reuseSearch(item)}>
                  <Ionicons name="refresh-outline" size={18} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.specPreview}>
                {(item.especificacoes || []).slice(0, 4).map((spec, index) => (
                  <View key={`${item.id}-${spec.nome}-${index}`} style={styles.specLine}>
                    <Text style={styles.specName}>{spec.nome}</Text>
                    <Text style={styles.specValue} numberOfLines={2}>{spec.valor}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="time-outline" size={36} color={theme.colors.muted} />
            <Text style={styles.emptyTitle}>Nenhuma pesquisa ainda</Text>
            <Text style={styles.emptyText}>Faça uma consulta para ela aparecer aqui.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function formatDate(value) {
  if (!value) return "Data não disponível";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data não disponível";
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  counter: {
    color: theme.colors.muted,
    fontWeight: "700"
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: theme.colors.card,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderColor: theme.colors.border,
    borderWidth: 1
  },
  clearButtonText: {
    color: theme.colors.text,
    fontWeight: "800"
  },
  disabledText: {
    color: theme.colors.muted
  },
  historyCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 14
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12
  },
  historyTitleBox: {
    flex: 1
  },
  vehicleTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 17
  },
  dateText: {
    color: theme.colors.muted,
    marginTop: 4,
    fontSize: 12
  },
  reuseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  specPreview: {
    gap: 8
  },
  specLine: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 11,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  specName: {
    color: theme.colors.primaryLight,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  specValue: {
    color: theme.colors.text,
    fontWeight: "700",
    marginTop: 4
  },
  emptyCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12
  },
  emptyText: {
    color: theme.colors.muted,
    marginTop: 6,
    textAlign: "center"
  }
});
