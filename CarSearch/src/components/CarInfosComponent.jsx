import { TextInput, View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export default function CarInfosComponent({
  title,
  marca,
  modelo,
  versao,
  setMarca,
  setModelo,
  setVersao
}) {
  return (
    <View style={styles.form}>
      {title ? <Text style={styles.groupTitle}>{title}</Text> : null}

      <TextInput
        placeholder="Marca (ex: Ford)"
        placeholderTextColor={theme.colors.muted}
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        maxLength={30}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Modelo (ex: Ranger)"
        placeholderTextColor={theme.colors.muted}
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        maxLength={40}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Versão (ex: Raptor)"
        placeholderTextColor={theme.colors.muted}
        style={styles.input}
        value={versao}
        onChangeText={setVersao}
        maxLength={60}
        autoCapitalize="words"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginTop: 12
  },
  groupTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700"
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border
  }
});
