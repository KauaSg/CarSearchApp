import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { theme } from "../styles/theme";

export default function ResultScreen({ navigation, route }) {
  const { resultado } = route.params || {};
  const specs = Array.isArray(resultado?.especificacoes) ? resultado.especificacoes : [];

  function goHistory() {
    navigation.getParent()?.navigate("Historico");
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Resultado padronizado</Text>
        <Text style={styles.title}>
          {resultado?.marca} {resultado?.modelo} {resultado?.versao}
        </Text>

        {resultado?.offline ? (
          <View style={styles.warningCard}>
            <Ionicons name="warning-outline" size={20} color={theme.colors.warning} />
            <Text style={styles.warningText}>{resultado.offlineMessage}</Text>
          </View>
        ) : null}

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fonte</Text>
            <Text style={styles.summaryValue}>{resultado?.fonte || "api"}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Campos</Text>
            <Text style={styles.summaryValue}>{specs.length}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="list-outline" size={22} color={theme.colors.primaryLight} />
            <Text style={styles.cardTitle}>Ficha técnica</Text>
          </View>

          {specs.length ? (
            specs.map((item, index) => (
              <View key={`${item.nome}-${index}`} style={styles.specItem}>
                <Text style={styles.specName}>{item.nome}</Text>
                <Text style={styles.specValue}>{item.valor || "Não disponível"}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhuma especificação retornada.</Text>
          )}
        </View>

        <View style={styles.flowControl}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.popToTop()}>
            <Ionicons name="search-outline" size={18} color={theme.colors.text} />
            <Text style={styles.buttonText}>Nova busca</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={goHistory}>
            <Ionicons name="time-outline" size={18} color={theme.colors.text} />
            <Text style={styles.buttonText}>Histórico</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 52,
    paddingBottom: 36
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 12
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
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
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
  summaryCard: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },
  summaryItem: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  summaryValue: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 4
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  specItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10
  },
  specName: {
    color: theme.colors.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  specValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    lineHeight: 22
  },
  emptyText: {
    color: theme.colors.muted,
    textAlign: "center",
    padding: 16
  },
  flowControl: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
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
  buttonText: {
    color: theme.colors.text,
    fontWeight: "800"
  }
});
