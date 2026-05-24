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

export default function CarComparatorResultScreen({ navigation, route }) {
  const { carros, resultado } = route.params || {};
  const lista = Array.isArray(resultado) ? resultado : [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Resultado da comparação</Text>

        <View style={styles.header}>
          <View style={styles.carView}>
            <Text style={styles.brand}>{carros?.marca?.toUpperCase()}</Text>
            <Text style={styles.model}>{carros?.modelo} {carros?.versao}</Text>
          </View>

          <Text style={styles.vs}>X</Text>

          <View style={styles.carView}>
            <Text style={styles.brand}>{carros?.marca2?.toUpperCase()}</Text>
            <Text style={styles.model}>{carros?.modelo2} {carros?.versao2}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="analytics-outline" size={22} color={theme.colors.primaryLight} />
            <Text style={styles.cardTitle}>Análise competitiva</Text>
          </View>

          {lista.length ? (
            lista.map((item, index) => (
              <View style={styles.obsCard} key={`${item}-${index}`}>
                <View style={styles.obsBadge}>
                  <Text style={styles.obsBadgeText}>{index + 1}</Text>
                </View>

                <Text style={styles.obsItemText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Nenhum item retornado na comparação.</Text>
          )}
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.popToTop()}>
          <Ionicons name="refresh-outline" size={18} color={theme.colors.text} />
          <Text style={styles.buttonText}>Nova comparação</Text>
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
    textTransform: "uppercase",
    marginBottom: 18
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18
  },
  carView: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    minHeight: 92,
    justifyContent: "center",
    borderColor: theme.colors.border,
    borderWidth: 1
  },
  brand: {
    color: theme.colors.primaryLight,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1
  },
  model: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
    textAlign: "center"
  },
  vs: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "900"
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
    marginBottom: 14
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  obsCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10
  },
  obsBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  obsBadgeText: {
    color: theme.colors.text,
    fontWeight: "900"
  },
  obsItemText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  },
  emptyText: {
    color: theme.colors.muted,
    textAlign: "center",
    padding: 16
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 18
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: "800"
  }
});
