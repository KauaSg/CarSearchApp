import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BASE_URL } from "../service/CarService";
import { theme } from "../styles/theme";

const items = [
  {
    icon: "search-outline",
    title: "Consulta técnica",
    text: "O usuário informa marca, modelo, versão e atributos livres para receber uma ficha técnica padronizada."
  },
  {
    icon: "git-compare-outline",
    title: "Comparação competitiva",
    text: "A tela de comparação apoia analistas na leitura de posicionamento entre veículos Ford e concorrentes."
  },
  {
    icon: "cloud-outline",
    title: "Integração com API",
    text: "O app consome o backend Spring Boot dos repositórios do grupo, com suporte aos endpoints /carros e /veiculos."
  },
  {
    icon: "time-outline",
    title: "Histórico na nuvem",
    text: "As últimas consultas são armazenadas no Cloud Firestore e vinculadas ao usuário autenticado."
  },
  {
    icon: "person-circle-outline",
    title: "Autenticação",
    text: "Login e cadastro com Firebase Authentication permitem separar dados por usuário e melhorar a rastreabilidade."
  }
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={require("../../assets/fordLogo.png")} style={styles.logo} />

        <Text style={styles.kicker}>Sprint Mobile & IoT</Text>
        <Text style={styles.title}>Sobre a solução</Text>
        <Text style={styles.subtitle}>
          O CarSearch Mobile resolve o desafio de Inteligência Competitiva Automotiva, reduzindo buscas manuais e entregando dados técnicos claros, organizados e comparáveis.
        </Text>

        <View style={styles.apiCard}>
          <Text style={styles.apiLabel}>Backend configurado</Text>
          <Text style={styles.apiValue}>{BASE_URL}</Text>
        </View>

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
          <Text style={styles.deliveryTitle}>Itens entregues nesta sprint</Text>
          <Text style={styles.deliveryText}>✓ React Native com Expo</Text>
          <Text style={styles.deliveryText}>✓ Navegação por abas e stacks</Text>
          <Text style={styles.deliveryText}>✓ Consumo de API assíncrona</Text>
          <Text style={styles.deliveryText}>✓ Tratamento de loading e erro</Text>
          <Text style={styles.deliveryText}>✓ Login e cadastro com Firebase</Text>
          <Text style={styles.deliveryText}>✓ Histórico por usuário no Firestore</Text>
          <Text style={styles.deliveryText}>✓ Fallback demonstrativo para apresentação</Text>
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
  apiCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 14
  },
  apiLabel: {
    color: theme.colors.primaryLight,
    fontWeight: "800",
    fontSize: 12,
    textTransform: "uppercase"
  },
  apiValue: {
    color: theme.colors.text,
    fontWeight: "700",
    marginTop: 5
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
  deliveryText: {
    color: theme.colors.text,
    lineHeight: 24,
    fontWeight: "600"
  }
});
