import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { theme } from "../styles/theme";

const items = [
  {
    icon: "search-outline",
    title: "Consulta orientada",
    text: "Informe marca, modelo, versão e os atributos desejados para receber uma ficha técnica organizada."
  },
  {
    icon: "git-compare-outline",
    title: "Comparação rápida",
    text: "Compare dois veículos em uma leitura direta, com foco nos pontos que mais importam para análise."
  },
  {
    icon: "time-outline",
    title: "Histórico privado",
    text: "Suas consultas ficam vinculadas à sua conta, permitindo retomar pesquisas anteriores com facilidade."
  },
  {
    icon: "shield-checkmark-outline",
    title: "Acesso seguro",
    text: "O app usa login para separar as informações de cada pessoa e manter o histórico individual."
  },
  {
    icon: "car-sport-outline",
    title: "Foco no desafio Ford",
    text: "A experiência foi desenhada para apoiar inteligência competitiva automotiva com dados claros e comparáveis."
  }
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>CarSearch Ford</Text>
        <Text style={styles.title}>Inteligência competitiva automotiva</Text>
        <Text style={styles.subtitle}>
          Uma ferramenta mobile para consultar, comparar e acompanhar especificações técnicas de veículos de forma simples.
        </Text>

        {items.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={22} color={theme.colors.text} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          </View>
        ))}

        <View style={styles.deliveryCard}>
          <Text style={styles.deliveryTitle}>Fluxo principal</Text>
          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.deliveryText}>Entre com sua conta para acessar suas pesquisas.</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.deliveryText}>Busque um veículo e escolha os atributos técnicos.</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.deliveryText}>Consulte resultados, compare modelos e acompanhe o histórico.</Text>
          </View>
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
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    gap: 12,
    marginBottom: 12
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  textBox: {
    flex: 1
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  cardText: {
    color: theme.colors.muted,
    lineHeight: 20,
    marginTop: 5
  },
  deliveryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 4
  },
  deliveryTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 10
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 10
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    color: theme.colors.text,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "800"
  },
  deliveryText: {
    flex: 1,
    color: theme.colors.text,
    lineHeight: 21,
    fontWeight: "600"
  }
});
